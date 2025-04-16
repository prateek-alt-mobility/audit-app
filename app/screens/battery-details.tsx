import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { BatteryDetailsType, BatteryInfo, StatusAlerts, TestStatistics, TestsList } from '../../components/batteryDiagnostics';
import { RootState } from '../../store';
import {
  useApproveTestMutation,
  useGetBatteryTestsQuery,
  useGetDeviceCommandDetailQuery,
  useGetTestResultIdMutation,
  useRunBatteryTestMutation,
  useStartBatteryMutation,
} from '../../store/services/batteryDiagnosticApi';
import { ApprovalStatus } from '../../store/services/interfaces/batteryEnums';
import { TestStatus } from '../../store/services/interfaces/batteryTests.interface';
import { setTestResultId } from '../../store/slices/batterySlice';

const BatteryDetails = () => {
  const { serialNumber, batteryData } = useSelector((state: RootState) => state.battery);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isBatteryOn, setIsBatteryOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestsStarted, setIsTestsStarted] = useState(false);
  const [isRestartingTests, setIsRestartingTests] = useState(false);
  const [startCommandSent, setStartCommandSent] = useState(false);
  const requestCountRef = useRef(0);
  
  // New states for UI updates
  const [pollingTime, setPollingTime] = useState(0);
  const [pollingLogs, setPollingLogs] = useState<string[]>([]);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    data: batteryTests,
    isLoading: isLoadingTests,
    isError: isTestError,
    refetch: refetchTests,
  } = useGetBatteryTestsQuery(serialNumber);

  // Use a hardcoded serial number if none is provided, for testing purposes
  const effectiveSerialNumber = serialNumber || "BAT12345";
  
  const {
    data: deviceCommandDetail,
    isLoading: isLoadingDeviceCommand,
    error: deviceCommandError
  } = useGetDeviceCommandDetailQuery(effectiveSerialNumber, {
    // Enable polling every 3 seconds when start command is sent but battery is not yet on
    pollingInterval: startCommandSent && !isBatteryOn ? 3000 : 0,
  });

  // Add runBatteryTest mutation for the Start Test button
  const [runBatteryTest, { isLoading: isRunningTest }] = useRunBatteryTestMutation();

  // Start Battery mutation
  const [startBattery, { isLoading: isStartingBattery, error: startBatteryError }] = useStartBatteryMutation();

  // Add getTestResultId mutation
  const [getTestResultId, { isLoading: isLoadingTestResult }] = useGetTestResultIdMutation();
  
  // Add approveTest mutation
  const [approveTest, { isLoading: isApprovingTest }] = useApproveTestMutation();

  const dispatch = useDispatch();

  // Add a timer for polling duration
  useEffect(() => {
    // Start timer when polling begins
    if (startCommandSent && !isBatteryOn) {
      // Clear any existing interval
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      
      // Reset timer
      setPollingTime(0);
      
      // Start a new interval
      pollingIntervalRef.current = setInterval(() => {
        setPollingTime(prev => prev + 1);
      }, 1000);
      
      // Add first log
      addPollingLog("Starting battery power-up sequence...");
    } else if (!startCommandSent || isBatteryOn) {
      // Stop timer when polling ends
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      
      // Add final log if battery is turned on
      if (isBatteryOn && pollingTime > 0) {
        addPollingLog("Battery successfully powered on!");
        // Reset timer after a delay
        setTimeout(() => {
          setPollingTime(0);
          setPollingLogs([]);
        }, 3000);
      }
    }
    
    // Cleanup interval on unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [startCommandSent, isBatteryOn, pollingTime]);

  // Helper function to add logs with timestamps
  const addPollingLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setPollingLogs(prev => [logMessage, ...prev].slice(0, 5)); // Keep only the 5 most recent logs
  };

  // Log the API response when it's received
  useEffect(() => {
    console.log("Serial Number being used:", effectiveSerialNumber);
    if (deviceCommandDetail) {
      console.log("Device command detail polling response:", deviceCommandDetail);
      console.log("Battery status (is_start):", deviceCommandDetail.is_start);
      console.log("Polling active:", startCommandSent && !isBatteryOn);
      // Update battery status based on the API response
      setIsBatteryOn(deviceCommandDetail.is_start);
      
      // If battery is now on, we can stop showing the "command sent" message
      if (deviceCommandDetail.is_start) {
        setStartCommandSent(false);
        console.log("Battery turned on successfully, polling stopped");
      }
    }
    
    if (deviceCommandError) {
      // console.error("Device command error:", deviceCommandError);
    }
  }, [deviceCommandDetail, deviceCommandError, effectiveSerialNumber, startCommandSent, isBatteryOn]);

  // Get battery details from API and state
  const getBatteryDetails = (): BatteryDetailsType => {
    // Use optional chaining to safely access properties
    
    return {
      batteryNumber: batteryData.serialNumber || serialNumber || "N/A",
      charge: deviceCommandDetail?.charge_ah?.count !== undefined 
        ? `${deviceCommandDetail.charge_ah.count}Ah` : "N/A",
      discharge: deviceCommandDetail?.discharge_ah?.count !== undefined 
        ? `${deviceCommandDetail.discharge_ah.count}Ah` : "N/A",
      status: isBatteryOn ? "Active" : "Inactive",
      plantCode: batteryData.plantCode || "N/A",
      modelNo: batteryData.modelNo || "N/A",
      date: batteryData.date || "N/A",
      bmsModelNo: batteryData.bmsModelNo || "N/A",
      bmsNumber: batteryData.bmsNumber || "N/A",
      softwareVersion: batteryData.softwareVersion || "N/A",
      leaseDays: deviceCommandDetail?.lease_days?.count !== undefined 
        ? `${deviceCommandDetail.lease_days.count} days` : "N/A"
    };
  };

  const toggleBattery = async () => {
    if (isBatteryOn) {
      // Battery is already on - we keep the existing logic to turn it off
      setIsLoading(true);
      // Simulate API call with 1.5 second delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsBatteryOn(false);
      setIsLoading(false);
      // Reset tests when battery is turned off
      setIsTestsStarted(false);
    } else {
      // Battery is off - use the startBattery API to turn it on
      try {
        console.log("Initiating startBattery API call for serial number:", effectiveSerialNumber);
        setIsLoading(true);
        const response = await startBattery(effectiveSerialNumber).unwrap();
        console.log("Start battery API response:", response);
        console.log("Starting polling for battery status...");
        setStartCommandSent(true);
      } catch (error) {
        console.error("Error starting battery:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle starting a test for pending tests
  const handleReadyTest = async (testId: string, testType: string) => {
    if (!isBatteryOn) {
      console.error("Cannot start test: Battery is not powered on");
      return;
    }

    try {
      // Call the runBatteryTest API
      const payload = {
        device_id: effectiveSerialNumber,
        test_id: testId,
      };
      
      console.log("Starting test with payload:", payload);
      
      const response = await runBatteryTest(payload).unwrap();
      console.log("Test started successfully:", response);
      
      // Check if the response has data that might contain a test result ID
      // Using type assertion since we know the structure might vary
      const responseData = response as any;
      if (responseData && 
          (responseData.data?.test_result_id || 
           responseData.test_result_id)) {
           
        const resultId = String(responseData.data?.test_result_id || responseData.test_result_id);
        
        // Store the test result ID in Redux
        dispatch(setTestResultId({
          testId: testId,
          resultId: resultId
        }));
        
        console.log(`Stored test result ID ${resultId} in Redux for test ${testId} (type: ${testType})`);
      } else {
        console.log("No test result ID found in the response");
        
        // If no test result ID in response, try to get it separately
        try {
          const resultData = await getTestResultId(testId).unwrap();
          if (resultData && resultData.result_id) {
            // Store the test result ID in Redux
            dispatch(setTestResultId({
              testId: testId,
              resultId: resultData.result_id
            }));
            console.log(`Retrieved and stored test result ID ${resultData.result_id} for test ${testId} (type: ${testType})`);
          }
        } catch (error) {
          console.error("Error getting test result ID after running test:", error);
        }
      }
      
      // After successful test run, refresh the tests to get updated statuses
      await refetchTests();
    } catch (error) {
      console.error("Error starting test:", error);
    }
  };

  // Handle ready test for not started tests
  const handleStartTest = async (testId: string, testType: string) => {
    if (!isBatteryOn) {
      console.error("Cannot ready test: Battery is not powered on");
      return;
    }

    try {
      // Call the getTestResultId mutation with the test ID
      const resultData = await getTestResultId(testId).unwrap();
      
      // Log the test result ID and test type
      if (resultData && resultData.result_id) {
        console.log(`Test result ID for test ${testId} (type: ${testType}): ${resultData.result_id}`);
        
        // Store the test result ID in Redux
        dispatch(setTestResultId({
          testId: testId,
          resultId: resultData.result_id
        }));
        console.log(`Stored test result ID ${resultData.result_id} in Redux for test ${testId} (type: ${testType})`);
      } else {
        console.log(`No result ID available for test ${testId} (type: ${testType}) yet`);
      }
    } catch (error) {
      console.error(`Error getting test result ID for test ${testId} (type: ${testType}):`, error);
    }
    
    console.log("Test ready with ID:", testId, "and type:", testType);
  };
  
  // Handle approving a manual test
  const handleApproveTest = async (testId: string, resultId: string) => {
    try {
      console.log(`Approving manual test with ID: ${testId}, result ID: ${resultId}`);
      
      // Get user email from auth state
      const userEmail = user?.email || 'unknown-user@example.com';
      
      // Call API to approve the test
      const payload = {
        result_id: resultId,
        approved_by: userEmail,
        status: ApprovalStatus.Approved
      };

      await approveTest(payload).unwrap();
      console.log(`Test ${testId} successfully approved`);
      
      // Refetch tests to update UI
      await refetchTests();
    } catch (error) {
      console.error(`Error approving test ${testId}:`, error);
    }
  };
  
  // Handle rejecting a manual test
  const handleRejectTest = async (testId: string, resultId: string) => {
    try {
      console.log(`Rejecting manual test with ID: ${testId}, result ID: ${resultId}`);
      
      // Get user email from auth state
      const userEmail = user?.email || 'unknown-user@example.com';
      
      // Call API to reject the test
      const payload = {
        result_id: resultId,
        approved_by: userEmail,
        status: ApprovalStatus.Rejected
      };
      
      await approveTest(payload).unwrap();
      console.log(`Test ${testId} marked as rejected`);
      
      // Refetch tests to update UI
      await refetchTests();
    } catch (error) {
      console.error(`Error rejecting test ${testId}:`, error);
    }
  };

  // Wrapper for getTestResultId that can be passed to TestItem components
  const fetchTestResultId = async (testId: string) => {
    try {
      const resultData = await getTestResultId(testId).unwrap();
      return resultData;
    } catch (error) {
      console.error(`Error polling for test result ID for test ${testId}:`, error);
      return null;
    }
  };

  // Enhanced refetchTests function to ensure it returns a Promise
  const handleRefetchTests = async () => {
    console.log("Refetching all battery tests...");
    try {
      const result = await refetchTests();
      console.log("Battery tests refetched successfully");
      return result;
    } catch (error) {
      console.error("Error refetching battery tests:", error);
      throw error;
    }
  };

  // Calculate test statistics based on the battery tests data
  const getTestStatistics = () => {
    if (!batteryTests || batteryTests.length === 0) {
      return {
        total: 0,
        notStarted: 0,
        pending: 0,
        approved: 0,
        rejected: 0
      };
    }

    const totalTests = batteryTests.length;
    const notStarted = batteryTests.filter(test => test.status === TestStatus.NotStarted).length;
    const pending = batteryTests.filter(test => test.status === TestStatus.Pending).length;
    const approved = batteryTests.filter(test => test.status === TestStatus.Success).length;
    const rejected = batteryTests.filter(test => test.status === TestStatus.Failed).length;

    return {
      total: totalTests,
      notStarted,
      pending,
      approved,
      rejected
    };
  };

  const startDiagnosticTest = async () => {
    setIsRestartingTests(true);
    setIsTestsStarted(true);
    
    try {
      await handleRefetchTests();
    } catch (error) {
      console.error('Error restarting tests:', error);
    } finally {
      setIsRestartingTests(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Battery Details",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#111827',
        }}
      />
      <View className="flex-1 px-3 py-3">
        {/* Top section - Battery Information */}
        <View>
          <BatteryInfo 
            batteryDetails={getBatteryDetails()}
            isBatteryOn={isBatteryOn}
            isLoading={isLoading || isStartingBattery}
            isLoadingDeviceCommand={isLoadingDeviceCommand}
            toggleBattery={toggleBattery}
            startCommandSent={startCommandSent}
          />

          {/* Status Alerts */}
          <StatusAlerts 
            isBatteryOn={isBatteryOn}
            isLoading={isLoading || isStartingBattery}
            isLoadingDeviceCommand={isLoadingDeviceCommand}
            isRestartingTests={isRestartingTests}
            isTestsStarted={isTestsStarted}
            deviceCommandError={deviceCommandError || startBatteryError}
            startDiagnosticTest={startDiagnosticTest}
            startCommandSent={startCommandSent}
            pollingTime={pollingTime}
            pollingLogs={pollingLogs}
          />

          {/* Test Statistics */}
          {isTestsStarted && isBatteryOn && !isLoadingTests && (
            <TestStatistics 
              total={getTestStatistics().total}
              notStarted={getTestStatistics().notStarted}
              pending={getTestStatistics().pending}
              approved={getTestStatistics().approved}
              rejected={getTestStatistics().rejected}
            />
          )}
        </View>

        {/* Tests List - Allow it to expand and take remaining space */}
        {isTestsStarted && isBatteryOn && (
          <View className="mt-2 flex-1">
            <TestsList 
              batteryTests={batteryTests}
              isLoadingTests={isLoadingTests}
              isRestartingTests={isRestartingTests}
              isTestError={isTestError}
              refetchTests={handleRefetchTests}
              onStartTest={handleStartTest}
              onReadyTest={handleReadyTest}
              getTestResultId={fetchTestResultId}
              onApproveTest={handleApproveTest}
              onRejectTest={handleRejectTest}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BatteryDetails; 