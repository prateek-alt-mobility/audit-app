import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BatteryPlaceholderImage from "../../assets/images/battery_placeholder.png";
import { useGetBatteryTestsQuery } from '../../store/services/batteryDiagnosticApi';

type TestType = 'Manual' | 'Automatic';
type TestStatus = 'pending' | 'approved' | 'rejected';

interface TestStatusMap {
  [key: string]: TestStatus;
}

interface AutomaticTestResult {
  status: TestStatus;
  message: string;
  timestamp: string;
}

interface AutomaticTestResultsMap {
  [key: string]: AutomaticTestResult;
}

interface TestTimerMap {
  [key: string]: number;
}

const BatteryDetails = () => {
  const [isBatteryOn, setIsBatteryOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestsStarted, setIsTestsStarted] = useState(false);
  const [isRestartingTests, setIsRestartingTests] = useState(false);
  const [testStatuses, setTestStatuses] = useState<TestStatusMap>({});
  const [automaticTestResults, setAutomaticTestResults] = useState<AutomaticTestResultsMap>({});
  const [expandedResults, setExpandedResults] = useState<string[]>([]);
  const [runningAutomaticTests, setRunningAutomaticTests] = useState<string[]>([]);
  const [testTimers, setTestTimers] = useState<TestTimerMap>({});
  const [timerIntervals, setTimerIntervals] = useState<{[key: string]: ReturnType<typeof setInterval>}>({});

  const {
    data: batteryTests,
    isLoading: isLoadingTests,
    isError: isTestError,
    refetch: refetchTests
  } = useGetBatteryTestsQuery();

  const batteryDetails = {
    batteryNumber: "BAT001",
    charge: "85%",
    discharge: "0.2kW/h",
    status: "Active"
  };

  const toggleBattery = async () => {
    setIsLoading(true);
    // Simulate API call with 1.5 second delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsBatteryOn(!isBatteryOn);
    setIsLoading(false);
    // Reset tests when battery is turned off
    if (isBatteryOn) {
      setIsTestsStarted(false);
    }
  };

  const toggleResultExpansion = (testId: string) => {
    setExpandedResults(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const startTimer = (testId: string) => {
    setTestTimers(prev => ({ ...prev, [testId]: 0 }));
    const interval = setInterval(() => {
      setTestTimers(prev => ({ ...prev, [testId]: (prev[testId] || 0) + 1 }));
    }, 1000);
    setTimerIntervals(prev => ({ ...prev, [testId]: interval }));
  };

  const stopTimer = (testId: string) => {
    if (timerIntervals[testId]) {
      clearInterval(timerIntervals[testId]);
      setTimerIntervals(prev => {
        const newIntervals = { ...prev };
        delete newIntervals[testId];
        return newIntervals;
      });
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(timerIntervals).forEach(clearInterval);
    };
  }, [timerIntervals]);

  const mockAutomaticTest = async (testId: string) => {
    setRunningAutomaticTests(prev => [...prev, testId]);
    startTimer(testId);
    
    try {
      // Random delay between 3 and 15 seconds
      const delay = Math.floor(Math.random() * 12000) + 3000;
      await new Promise(resolve => setTimeout(resolve, delay));

      // Randomly decide success or failure (50-50 chance)
      const isSuccess = Math.random() >= 0.5;
      const status = isSuccess ? 'approved' : 'rejected';
      const timestamp = new Date().toLocaleString();
      
      const result: AutomaticTestResult = {
        status,
        message: isSuccess 
          ? "All test parameters are within acceptable ranges. The test completed successfully with no issues detected."
          : "Test failed due to one or more parameters being outside the acceptable range. Please check the system and try again.",
        timestamp
      };

      setAutomaticTestResults(prev => ({
        ...prev,
        [testId]: result
      }));

      setTestStatuses(prev => ({
        ...prev,
        [testId]: status
      }));

      // Automatically expand the result when it comes in
      setExpandedResults(prev => [...prev, testId]);
    } finally {
      stopTimer(testId);
      setTestTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[testId];
        return newTimers;
      });
      setRunningAutomaticTests(prev => prev.filter(id => id !== testId));
    }
  };

  const handleStartTest = (testId: string) => {
    mockAutomaticTest(testId);
  };

  const handleApproveTest = (testId: string) => {
    setTestStatuses(prev => ({
      ...prev,
      [testId]: 'approved'
    }));
  };

  const handleRejectTest = (testId: string) => {
    setTestStatuses(prev => ({
      ...prev,
      [testId]: 'rejected'
    }));
  };

  const handleResetStatus = (testId: string) => {
    setTestStatuses(prev => {
      const newStatuses = { ...prev };
      delete newStatuses[testId];
      return newStatuses;
    });
  };

  const getTestIcon = (testName: string) => {
    // Map test names to appropriate icons
    if (testName.toLowerCase().includes('physical verification')) {
      return <MaterialCommunityIcons name="handshake" size={24} color="#22c55e" />;
    } else if (testName.toLowerCase().includes('faults test')) {
      return <MaterialCommunityIcons name="alert-circle" size={24} color="#22c55e" />;
    } else if (testName.toLowerCase().includes('charger test')) {
      return <MaterialCommunityIcons name="battery-charging" size={24} color="#22c55e" />;
    } else if (testName.toLowerCase().includes('driving test 4')) {
      return <MaterialCommunityIcons name="car" size={24} color="#22c55e" />;
    } else if (testName.toLowerCase().includes('driving test 1')) {
      return <MaterialCommunityIcons name="car" size={24} color="#22c55e" />;
    } else if (testName.toLowerCase().includes('ignition on')) {
      return <MaterialCommunityIcons name="electric-switch" size={24} color="#22c55e" />;
    } else {
      return <MaterialCommunityIcons name="fan" size={24} color="#22c55e" />;
    }
  };

  const getTestStatistics = () => {
    const totalTests = batteryTests?.length || 0;
    const successfulTests = Object.values(testStatuses).filter(status => status === 'approved').length;
    const rejectedTests = Object.values(testStatuses).filter(status => status === 'rejected').length;
    
    return {
      total: totalTests,
      successful: successfulTests,
      rejected: rejectedTests
    };
  };

  const startDiagnosticTest = async () => {
    setIsRestartingTests(true);
    setIsTestsStarted(true);
    setTestStatuses({});
    setAutomaticTestResults({});
    setExpandedResults([]);
    setRunningAutomaticTests([]);
    
    try {
      await refetchTests();
    } catch (error) {
      console.error('Error restarting tests:', error);
    } finally {
      setIsRestartingTests(false);
    }
  };

  const getTestStatusStyles = (testId: string, testType: TestType) => {
    if (!testStatuses[testId]) return 'border-gray-200';
    
    switch (testStatuses[testId]) {
      case 'approved':
        return 'bg-green-50 border-green-500';
      case 'rejected':
        return 'bg-red-50 border-red-500';
      default:
        return 'border-gray-200';
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
      <View className="flex-1 px-4 py-6">
        <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <View className="flex-row">
            {/* Left side - Battery Image with Status Indicator */}
            <View className="w-1/3 items-center justify-center relative">
              <Image 
                source={BatteryPlaceholderImage as ImageSourcePropType}
                className="w-24 h-24"
                resizeMode="contain"
              />
              <View 
                className={`absolute top-0 right-0 w-4 h-4 rounded-full ${
                  isBatteryOn ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
            </View>

            {/* Right side - Battery Details */}
            <View className="w-2/3 pl-4">
              <Text className="text-gray-900 text-lg font-semibold mb-2">
                Battery {batteryDetails.batteryNumber}
              </Text>
              <Text className="text-gray-600 mb-1">
                Charge: {batteryDetails.charge}
              </Text>
              <Text className="text-gray-600 mb-1">
                Discharge Rate: {batteryDetails.discharge}
              </Text>
              <Text className="text-gray-600 mb-3">
                Status: {batteryDetails.status}
              </Text>
              
              <TouchableOpacity
                onPress={toggleBattery}
                disabled={isLoading}
                className={`py-2 px-4 rounded-lg ${
                  isBatteryOn ? 'bg-red-500' : 'bg-green-500'
                } ${isLoading ? 'opacity-50' : ''}`}
              >
                <Text className="text-white text-center font-medium">
                  {isBatteryOn ? 'Switch Off' : 'Switch On'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Loading Indicator */}
        {isLoading && (
          <View className="mt-4 items-center">
            <ActivityIndicator size="large" color="#22c55e" />
            <Text className="text-gray-500 mt-2">
              {isBatteryOn ? 'Switching off...' : 'Switching on...'}
            </Text>
          </View>
        )}

        {/* Alert Messages */}
        {!isLoading && (
          <>
            {/* Negative Alert - Battery Off */}
            {!isBatteryOn && (
              <View className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-red-500 items-center justify-center mr-3">
                    <Text className="text-white text-lg">!</Text>
                  </View>
                  <Text className="text-red-600 flex-1">
                    Battery is switched off. You cannot run battery diagnostic tests.
                  </Text>
                </View>
              </View>
            )}

            {/* Positive Alert - Battery On */}
            {isBatteryOn && (
              <>
                <View className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <View className="flex-row items-center mb-3">
                    <View className="w-8 h-8 rounded-full bg-green-500 items-center justify-center mr-3">
                      <Text className="text-white text-lg">✓</Text>
                    </View>
                    <Text className="text-green-600 flex-1">
                      Battery is switched on. You can now run battery diagnostic tests.
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={startDiagnosticTest}
                    disabled={isRestartingTests}
                    className={`bg-green-500 py-2 rounded-lg ${isRestartingTests ? 'opacity-50' : ''}`}
                  >
                    <View className="flex-row items-center justify-center">
                      {isRestartingTests ? (
                        <>
                          <ActivityIndicator size="small" color="white" />
                          <Text className="text-white font-medium ml-2">
                            Restarting Tests...
                          </Text>
                        </>
                      ) : (
                        <Text className="text-white text-center font-medium">
                          {isTestsStarted ? 'Restart Battery Diagnostic Tests' : 'Start Battery Diagnostic Test'}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Test Statistics */}
                {isTestsStarted && (
                  <View className="mt-4 flex-row justify-between gap-x-3 space-x-3">
                    <View className="flex-1 bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-sm">
                      <Text className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Total Tests</Text>
                      <View className="flex-row items-center">
                        <MaterialCommunityIcons name="clipboard-list" size={16} color="#6b7280" />
                        <Text className="text-gray-900 font-medium text-base ml-1.5">
                          {getTestStatistics().total}
                        </Text>
                      </View>
                    </View>
                    
                    <View className="flex-1 bg-green-50 rounded-lg px-3 py-2 border border-green-200 shadow-sm">
                      <Text className="text-green-600 text-[10px] uppercase tracking-wider mb-1">Successful</Text>
                      <View className="flex-row items-center">
                        <MaterialCommunityIcons name="check-circle" size={16} color="#22c55e" />
                        <Text className="text-green-600 font-medium text-base ml-1.5">
                          {getTestStatistics().successful}
                        </Text>
                      </View>
                    </View>
                    
                    <View className="flex-1 bg-red-50 rounded-lg px-3 py-2 border border-red-200 shadow-sm">
                      <Text className="text-red-600 text-[10px] uppercase tracking-wider mb-1">Failed</Text>
                      <View className="flex-row items-center">
                        <MaterialCommunityIcons name="close-circle" size={16} color="#ef4444" />
                        <Text className="text-red-600 font-medium text-base ml-1.5">
                          {getTestStatistics().rejected}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </>
            )}

            {/* Tests Section */}
            {isTestsStarted && isBatteryOn && (
              <View className="mt-4 flex-1">
                {(isLoadingTests || isRestartingTests) ? (
                  <View className="items-center py-4">
                    <ActivityIndicator size="large" color="#22c55e" />
                    <Text className="text-gray-500 mt-2">
                      {isRestartingTests ? 'Restarting tests...' : 'Loading tests...'}
                    </Text>
                  </View>
                ) : isTestError ? (
                  <View className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <Text className="text-red-600 text-center">
                      Failed to load battery tests. Please try again.
                    </Text>
                    <TouchableOpacity
                      onPress={refetchTests}
                      className="bg-red-500 py-2 rounded-lg mt-2"
                    >
                      <Text className="text-white text-center">Retry</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ScrollView 
                    className="space-y-4" 
                    contentContainerStyle={{ 
                      paddingBottom: 100 
                    }}
                  >
                    {batteryTests?.map((test) => (
                      <View 
                        key={test.id} 
                        className={`bg-white rounded-lg p-5 shadow-sm border mt-4 ${getTestStatusStyles(test.id, test.test_type as TestType)}`}
                      >
                        <View className="flex-row items-center mb-3">
                          {getTestIcon(test.test_name)}
                          <View className="flex-1 ml-3">
                            <Text className="text-gray-900 font-semibold text-lg">
                              {test.test_name}
                            </Text>
                            <View className="flex-row items-center mt-1">
                              <Text className={`text-sm ${(test.test_type as TestType) === 'Manual' ? 'text-blue-600' : 'text-purple-600'}`}>
                                {(test.test_type as TestType) === 'Manual' ? (
                                  <Ionicons name="hand-left" size={14} color={(test.test_type as TestType) === 'Manual' ? '#2563eb' : '#9333ea'} />
                                ) : (
                                  <Ionicons name="flash" size={14} color={(test.test_type as TestType) === 'Manual' ? '#2563eb' : '#9333ea'} />
                                )}
                                {' '}{test.test_type} Test
                              </Text>
                            </View>
                          </View>
                        </View>

                        <Text className="text-gray-600 mb-4 text-sm">
                          {test.test_description}
                        </Text>

                        {test.thresholds.length > 0 && (
                          <View className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <Text className="text-gray-700 text-sm mb-2 font-medium">
                              <MaterialCommunityIcons name="chart-bell-curve" size={16} color="#374151" />
                              {' '}Thresholds
                            </Text>
                            {test.thresholds.map((threshold) => (
                              <Text key={threshold.id} className="text-gray-600 text-sm ml-6">
                                • {threshold.parameter}: {threshold.min_value} - {threshold.max_value} {threshold.unit}
                              </Text>
                            ))}
                          </View>
                        )}

                        {/* Status Pills for Manual Tests */}
                        {(test.test_type as TestType) === 'Manual' && testStatuses[test.id] && (
                          <View className="mb-4">
                            <View 
                              className={`self-start rounded-full px-3 py-1 ${
                                testStatuses[test.id] === 'approved' 
                                  ? 'bg-green-100 border border-green-500' 
                                  : 'bg-red-100 border border-red-500'
                              }`}
                            >
                              <Text 
                                className={`text-sm font-medium ${
                                  testStatuses[test.id] === 'approved' 
                                    ? 'text-green-600' 
                                    : 'text-red-600'
                                }`}
                              >
                                {testStatuses[test.id] === 'approved' ? '✓ Approved' : '✕ Rejected'}
                              </Text>
                            </View>
                          </View>
                        )}

                        {/* Automatic Test Results */}
                        {(test.test_type as TestType) === 'Automatic' && automaticTestResults[test.id] && (
                          <View className="mb-4">
                            <TouchableOpacity
                              onPress={() => toggleResultExpansion(test.id)}
                              className={`flex-row items-center justify-between p-3 rounded-lg ${
                                automaticTestResults[test.id].status === 'approved'
                                  ? 'bg-green-50 border border-green-200'
                                  : 'bg-red-50 border border-red-200'
                              }`}
                            >
                              <View className="flex-row items-center">
                                <MaterialCommunityIcons
                                  name={automaticTestResults[test.id].status === 'approved' ? 'check-circle' : 'alert-circle'}
                                  size={20}
                                  color={automaticTestResults[test.id].status === 'approved' ? '#22c55e' : '#ef4444'}
                                />
                                <Text className={`ml-2 font-medium ${
                                  automaticTestResults[test.id].status === 'approved' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  Test {automaticTestResults[test.id].status === 'approved' ? 'Passed' : 'Failed'}
                                </Text>
                              </View>
                              <MaterialCommunityIcons
                                name={expandedResults.includes(test.id) ? 'chevron-up' : 'chevron-down'}
                                size={24}
                                color="#6b7280"
                              />
                            </TouchableOpacity>
                            
                            {expandedResults.includes(test.id) && (
                              <View className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <Text className="text-gray-700 text-sm">
                                  {automaticTestResults[test.id].message}
                                </Text>
                                <Text className="text-gray-500 text-xs mt-2">
                                  Completed at: {automaticTestResults[test.id].timestamp}
                                </Text>
                              </View>
                            )}
                          </View>
                        )}

                        <View className="flex-row justify-end space-x-3 mt-2">
                          {(test.test_type as TestType) === 'Manual' && !testStatuses[test.id] ? (
                            <>
                              <TouchableOpacity
                                onPress={() => handleRejectTest(test.id)}
                                className="flex-row items-center bg-red-50 border border-red-200 px-4 py-2 rounded-lg"
                              >
                                <Ionicons name="close-circle" size={18} color="#ef4444" />
                                <Text className="text-red-600 ml-2 font-medium">Reject</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => handleApproveTest(test.id)}
                                className="flex-row ml-3 items-center bg-green-50 border border-green-200 px-4 py-2 rounded-lg"
                              >
                                <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
                                <Text className="text-green-600 ml-2 font-medium">Approve</Text>
                              </TouchableOpacity>
                            </>
                          ) : (test.test_type as TestType) === 'Manual' ? (
                            <TouchableOpacity
                              onPress={() => handleResetStatus(test.id)}
                              className="flex-row items-center bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg"
                            >
                              <Ionicons name="refresh" size={18} color="#3b82f6" />
                              <Text className="text-blue-600 ml-2 font-medium">Reset Status</Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => handleStartTest(test.id)}
                              disabled={runningAutomaticTests.includes(test.id)}
                              className={`flex-row items-center ${
                                runningAutomaticTests.includes(test.id)
                                  ? 'bg-purple-50 opacity-50'
                                  : 'bg-purple-50 border border-purple-200'
                              } px-4 py-2 rounded-lg`}
                            >
                              {runningAutomaticTests.includes(test.id) ? (
                                <>
                                  <ActivityIndicator size="small" color="#9333ea" />
                                  <Text className="text-purple-600 ml-2 font-medium">
                                    Running Test... {testTimers[test.id]}s
                                  </Text>
                                </>
                              ) : (
                                <>
                                  <FontAwesome5 
                                    name={automaticTestResults[test.id] ? "redo" : "play"} 
                                    size={14} 
                                    color="#9333ea" 
                                  />
                                  <Text className="text-purple-600 ml-2 font-medium">
                                    {automaticTestResults[test.id] ? "Test Again" : "Start Test"}
                                  </Text>
                                </>
                              )}
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                )}
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BatteryDetails; 