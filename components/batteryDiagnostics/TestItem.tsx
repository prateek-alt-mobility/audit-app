import { TestResultIdData } from '@/store/services/interfaces/batteryTestRun.interface';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { TestStatus } from '../../store/services/interfaces/batteryTests.interface';

export type TestType = 'Manual' | 'Automatic';

export interface TestItemProps {
  testId: string;
  testName: string;
  testType: TestType;
  testDescription: string;
  status?: TestStatus;
  testResultId?: string | null;
  onStartTest?: (testId: string, testType: TestType) => void;
  onReadyTest?: (testId: string, testType: TestType) => void;
  getTestResultId?: (testId: string) => Promise<TestResultIdData | null>;
  refetchTests?: () => Promise<any>;
  onApproveTest?: (testId: string, resultId: string) => void;
  onRejectTest?: (testId: string, resultId: string) => void;
}

const POLLING_INTERVAL = 5000; // 5 seconds
const MANUAL_TEST_DURATION = 60; // 1 minute in seconds

const TestItem: React.FC<TestItemProps> = ({
  testId,
  testName,
  testType,
  testDescription,
  status,
  testResultId,
  onStartTest,
  onReadyTest,
  getTestResultId,
  refetchTests,
  onApproveTest,
  onRejectTest
}) => {
  const [polling, setPolling] = useState(false);
  const [pollingSuccess, setPollingSuccess] = useState(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Manual test timer states
  const [manualTestActive, setManualTestActive] = useState(false);
  const [manualTestCompleted, setManualTestCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(MANUAL_TEST_DURATION);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // New loading states for approve/reject buttons
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  // ===== Polling Logic =====
  
  // Stop polling if the test status changes to Success
  useEffect(() => {
    if (status === TestStatus.Success && polling) {
      console.log(`Test ${testId} status changed to Success, stopping polling`);
      stopPolling();
      setPollingSuccess(true);
      
      // Refetch tests to update statistics and test results
      if (refetchTests) {
        console.log(`Refetching all battery tests after test ${testId} succeeded`);
        refetchTests();
      }
    }
  }, [status, testId, polling, refetchTests]);

  // Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      stopPolling();
      stopManualTestTimer();
    };
  }, []);

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setPolling(false);
  };

  // Function to start polling for test results
  const startPolling = () => {
    if (!getTestResultId || !testResultId) return;
    
    console.log(`Starting polling for test results: ${testId}, result ID: ${testResultId}`);
    setPolling(true);
    
    pollingIntervalRef.current = setInterval(async () => {
      try {
        console.log(`Polling for test results: ${testId}, result ID: ${testResultId}`);
        const response = await getTestResultId(testId);
        
        console.log(`Test ${testId} poll response:`, response);
        
        if (!response) {
          console.log(`No response data for test ${testId}`);
          return;
        }
        
        // Check if we got a success status - handle different possible formats
        const statusLower = response.status?.toLowerCase?.();
        const isCompleted = 
          statusLower === 'success' || 
          statusLower === 'failed' ||
          response.status === TestStatus.Success ||
          response.status === TestStatus.Failed;
            
        if (isCompleted) {
          console.log(`Test ${testId} completed with status: ${response.status}`);
          stopPolling();
          setPollingSuccess(true);
          
          // Refetch tests to update statistics and test results
          if (refetchTests) {
            console.log(`Refetching all battery tests after test ${testId} polling completed`);
            refetchTests();
          }
        } else {
          // Log additional diagnostics
          console.log(`Status check: Response status: ${response.status}, type: ${typeof response.status}`);
          console.log(`Test ${testId} still in progress: `, response);
        }
      } catch (error) {
        console.error(`Error polling for test ${testId} results:`, error);
      }
    }, POLLING_INTERVAL);
  };

  // ===== Manual Test Timer Logic =====
  
  const startManualTestTimer = () => {
    setManualTestActive(true);
    setManualTestCompleted(false);
    setRemainingTime(MANUAL_TEST_DURATION);
    
    timerIntervalRef.current = setInterval(() => {
      setRemainingTime(prevTime => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          stopManualTestTimer();
          setManualTestCompleted(true);
          return 0;
        }
        return newTime;
      });
    }, 1000);
  };
  
  const stopManualTestTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleApprove = async () => {
    if (onApproveTest && testResultId) {
      try {
        setApproveLoading(true);
        await onApproveTest(testId, testResultId);
      } catch (error) {
        console.error(`Error approving test ${testId}:`, error);
      } finally {
        setApproveLoading(false);
      }
    } else if (onApproveTest) {
      console.error(`Cannot approve test ${testId}: No test result ID available`);
    }
    resetManualTestState();
  };
  
  const handleReject = async () => {
    if (onRejectTest && testResultId) {
      try {
        setRejectLoading(true);
        await onRejectTest(testId, testResultId);
      } catch (error) {
        console.error(`Error rejecting test ${testId}:`, error);
      } finally {
        setRejectLoading(false);
      }
    } else if (onRejectTest) {
      console.error(`Cannot reject test ${testId}: No test result ID available`);
    }
    resetManualTestState();
  };
  
  const resetManualTestState = () => {
    setManualTestActive(false);
    setManualTestCompleted(false);
    setRemainingTime(MANUAL_TEST_DURATION);
  };

  // ===== UI Helper Functions =====

  const getTestIcon = () => {
    // Map test names to appropriate icons
    if (testName.toLowerCase().includes('physical verification')) {
      return <MaterialCommunityIcons name="handshake" size={24} color="#22c55e" />;
    } else if (testName.toLowerCase().includes('faults test')) {
      return <MaterialCommunityIcons name="alert-circle" size={24} color="#22c55e" />;
    } else if (testName.toLowerCase().includes('charger test')) {
      return <MaterialCommunityIcons name="battery-charging" size={24} color="#22c55e" />;
    } else if (testName.toLowerCase().includes('driving test')) {
      return <MaterialCommunityIcons name="car" size={24} color="#22c55e" />;
    } else if (testName.toLowerCase().includes('ignition on')) {
      return <MaterialCommunityIcons name="electric-switch" size={24} color="#22c55e" />;
    } else {
      return <MaterialCommunityIcons name="fan" size={24} color="#22c55e" />;
    }
  };

  // ===== Status UI Functions =====
  
  const getStatusStyles = () => {
    if (!status || status === TestStatus.NotStarted) return 'border-gray-200';
    
    switch (status) {
      case TestStatus.Success:
        return 'bg-green-50 border-green-500';
      case TestStatus.Failed:
        return 'bg-red-50 border-red-500';
      case TestStatus.Pending:
        return 'bg-yellow-50 border-yellow-500';
      default:
        return 'border-gray-200';
    }
  };

  const getStatusBadge = () => {
    if (!status || status === TestStatus.NotStarted) return null;
    
    let badgeClass = '';
    let textClass = '';
    let statusText = '';
    
    switch (status) {
      case TestStatus.Success:
        badgeClass = 'bg-green-100 border border-green-500';
        textClass = 'text-green-600';
        statusText = '✓ Approved';
        break;
      case TestStatus.Failed:
        badgeClass = 'bg-red-100 border border-red-500';
        textClass = 'text-red-600';
        statusText = '✕ Failed';
        break;
      case TestStatus.Pending:
        badgeClass = 'bg-yellow-100 border border-yellow-500';
        textClass = 'text-yellow-600';
        statusText = '⟳ Pending';
        break;
      default:
        return null;
    }
    
    return (
      <View className="mb-2">
        <View className={`self-start rounded-full px-3 py-1 ${badgeClass}`}>
          <Text className={`text-sm font-medium ${textClass}`}>{statusText}</Text>
        </View>
        
        {/* Add pill for pending status indicating test can be started */}
        {status === TestStatus.Pending && !manualTestActive && (
          <View className="self-start rounded-full px-3 py-1 mt-1 bg-blue-100 border border-blue-500">
            <Text className="text-sm font-medium text-blue-600">This test can be started now</Text>
          </View>
        )}
      </View>
    );
  };

  // ===== Button Handlers and UI =====

  const isAutomaticPendingTest = testType === 'Automatic' && status === TestStatus.Pending && testResultId;
  const isManualPendingTest = testType === 'Manual' && status === TestStatus.Pending;
  
  const handleButtonPress = () => {
    // Special handling for Automatic tests with Pending status and testResultId
    if (isAutomaticPendingTest) {
      console.log('Starting automatic test polling for test ID:', testId);
      startPolling();
      return;
    }
    
    // Special handling for Manual tests with Pending status
    if (isManualPendingTest && !manualTestActive) {
      console.log('Starting manual test timer for test ID:', testId);
      
      // First call onStartTest to initiate the test
      if (onStartTest) {
        console.log('Starting test with ID:', testId, 'and type:', testType);
        onStartTest(testId, testType);
      }
      
      // Then start the timer
      startManualTestTimer();
      return;
    }
    
    if (status === TestStatus.Success || status === TestStatus.Failed) {
      // For Success or Failed status, rerun the test by calling onReadyTest
      if (onReadyTest) {
        console.log('Rerunning test with ID:', testId, 'and type:', testType);
        onReadyTest(testId, testType);
        // Reset manual test state if it was a manual test
        if (testType === 'Manual') {
          resetManualTestState();
        }
      } else {
        console.log('Ready test function not provided for test ID:', testId);
      }
    } else if (!status || status === TestStatus.NotStarted) {
      // Call the ready test function for not started tests
      if (onReadyTest) {
        console.log('Ready test with ID:', testId, 'and type:', testType);
        onReadyTest(testId, testType);
      } else {
        console.log('Ready test function not provided for test ID:', testId);
      }
    } else if (status === TestStatus.Pending && !isAutomaticPendingTest && !isManualPendingTest) {
      // For other Pending tests, just call onStartTest
      if (onStartTest) {
        console.log('Starting test with ID:', testId, 'and type:', testType);
        onStartTest(testId, testType);
      } else {
        console.log('Start test function not provided for test ID:', testId);
      }
    } else {
      // For other statuses, just log
      console.log('Test button clicked for test ID:', testId, 'with status:', status);
    }
  };

  const getButtonText = () => {
    if (isAutomaticPendingTest) {
      return "Start Automatic Test";
    } else if (isManualPendingTest && !manualTestActive) {
      return "Start Manual Test";
    } else if (status === TestStatus.Success || status === TestStatus.Failed) {
      return "Rerun Test";
    } else if (!status || status === TestStatus.NotStarted) {
      return "Ready Test";
    }
    return "Start Test";
  };

  const getButtonColor = () => {
    if (status === TestStatus.Success) {
      return "bg-green-600";
    } else if (status === TestStatus.Failed) {
      return "bg-red-600";
    } else if (status === TestStatus.Pending) {
      return "bg-green-600";
    }
    return "bg-purple-600";
  };

  const getButtonIcon = () => {
    if (isAutomaticPendingTest) {
      return "flash";
    } else if (isManualPendingTest && !manualTestActive) {
      return "hand-back-left";
    } else if (status === TestStatus.Success || status === TestStatus.Failed) {
      return "refresh";
    }
    return "play-circle";
  };

  // ===== Render Component =====
  
  return (
    <View className={`rounded-lg p-5 shadow-sm border mt-4 ${getStatusStyles()}`}>
      {/* Test header section */}
      <View className="flex-row items-center mb-3">
        {getTestIcon()}
        <View className="flex-1 ml-3">
          <Text className="text-gray-900 font-semibold text-lg">
            {testName}
          </Text>
          <View className="flex-row items-center mt-1">
            <Text className={`text-sm ${testType === 'Manual' ? 'text-blue-600' : 'text-purple-600'}`}>
              {testType === 'Manual' ? (
                <MaterialCommunityIcons name="hand-back-left" size={14} color="#2563eb" />
              ) : (
                <MaterialCommunityIcons name="flash" size={14} color="#9333ea" />
              )}
              {' '}{testType} Test
            </Text>
          </View>
        </View>
      </View>

      {/* Status badges */}
      {getStatusBadge()}

      {/* Manual test timer */}
      {testType === 'Manual' && manualTestActive && (
        <View className="mb-4 bg-blue-50 p-3 rounded-md border border-blue-200">
          <View className="flex-row items-center justify-between">
            <Text className="text-blue-700 font-medium">
              {manualTestCompleted 
                ? "Test duration completed!" 
                : "You need to run the test for at least 1 minute"}
            </Text>
            <View className="bg-blue-100 px-3 py-1 rounded-full">
              <Text className="text-blue-700 font-bold">{formatTime(remainingTime)}</Text>
            </View>
          </View>
          
          {manualTestCompleted && (
            <View className="flex-row justify-center mt-3 space-x-4 gap-x-4">
              <TouchableOpacity 
                onPress={handleApprove}
                disabled={approveLoading || rejectLoading}
                className={`${approveLoading ? 'bg-green-400' : 'bg-green-600'} rounded-lg px-4 py-2 flex-row items-center`}
              >
                {approveLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <MaterialCommunityIcons name="check" size={18} color="white" />
                )}
                <Text className="text-white font-medium ml-2">
                  {approveLoading ? "Approving..." : "Approve"}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleReject}
                disabled={approveLoading || rejectLoading}
                className={`${rejectLoading ? 'bg-red-400' : 'bg-red-600'} rounded-lg px-4 py-2 flex-row items-center`}
              >
                {rejectLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <MaterialCommunityIcons name="close" size={18} color="white" />
                )}
                <Text className="text-white font-medium ml-2">
                  {rejectLoading ? "Rejecting..." : "Reject"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Test description */}
      <View className="mt-2">
        <Text className="text-gray-600 mb-4 text-sm">
          {testDescription}
        </Text>
      </View>
      
      {/* Test Result ID and polling status */}
      {testResultId && (
        <View className="mb-4 bg-gray-50 p-2 rounded-md border border-gray-200">
          <Text className="text-xs text-gray-500">Test Result ID:</Text>
          <Text className="text-sm text-gray-700 font-mono">{testResultId}</Text>
          
          {/* Polling indicator for automatic tests */}
          {testType === 'Automatic' && polling && (
            <View className="flex-row items-center mt-2">
              <ActivityIndicator size="small" color="#9333ea" />
              <Text className="text-xs text-purple-600 ml-2">Polling for test results...</Text>
            </View>
          )}
          
          {/* Test result message */}
          {testType === 'Automatic' && (status === TestStatus.Success || status === TestStatus.Failed) && (
            <View className={`mt-2 ${status === TestStatus.Success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} p-2 rounded-md border`}>
              <Text className={`text-xs ${status === TestStatus.Success ? 'text-green-600' : 'text-red-600'}`}>
                {status === TestStatus.Success ? 'Test completed successfully!' : 'Test failed!'}
              </Text>
            </View>
          )}
        </View>
      )}
      
      {/* Action button - hide for manual tests during active timer */}
      {(!manualTestActive || testType !== 'Manual') && (
        <View className="flex-row justify-end">
          <TouchableOpacity 
            onPress={handleButtonPress}
            className={`${getButtonColor()} rounded-lg px-4 py-2 flex-row items-center`}
            disabled={polling || (testType === 'Manual' && manualTestActive)} // Disable during polling or manual test
          >
            {polling ? (
              <>
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white font-medium ml-2">Testing...</Text>
              </>
            ) : (
              <>
                <MaterialCommunityIcons 
                  name={getButtonIcon()}
                  size={18} 
                  color="white" 
                />
                <Text className="text-white font-medium ml-2">{getButtonText()}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TestItem;