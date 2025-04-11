import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { AutomaticTestResult, BatteryDetailsType, BatteryInfo, StatusAlerts, TestStatistics, TestStatus, TestsList } from '../../components/batteryDiagnostics';
import { RootState } from '../../store';
import { useGetBatteryTestsQuery, useGetDeviceCommandDetailQuery, useStartBatteryMutation } from '../../store/services/batteryDiagnosticApi';

interface TestStatusMap {
  [key: string]: TestStatus;
}

interface AutomaticTestResultsMap {
  [key: string]: AutomaticTestResult;
}

interface TestTimerMap {
  [key: string]: number;
}

const BatteryDetails = () => {
  const { serialNumber, batteryData } = useSelector((state: RootState) => state.battery);
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
  }, [startCommandSent, isBatteryOn]);

  // Helper function to add logs with timestamps
  const addPollingLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setPollingLogs(prev => [logMessage, ...prev].slice(0, 5)); // Keep only the 5 most recent logs
  };

  // Log every time the query is fetched or polled
  useEffect(() => {
    requestCountRef.current += 1;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Device command details request #${requestCountRef.current}`, {
      polling: startCommandSent && !isBatteryOn, 
      serialNumber: effectiveSerialNumber,
      isPolling: startCommandSent && !isBatteryOn,
      pollingInterval: startCommandSent && !isBatteryOn ? 3000 : 0
    });
    
    // Add polling attempt log to UI if we're polling
    if (startCommandSent && !isBatteryOn && requestCountRef.current > 1) {
      addPollingLog(`Polling battery status (attempt ${requestCountRef.current - 1})...`);
    }
    
    return () => {
      console.log(`Request #${requestCountRef.current} completed`);
    };
  }, [isLoadingDeviceCommand, effectiveSerialNumber, startCommandSent, isBatteryOn]);

  // Start Battery mutation
  const [startBattery, { isLoading: isStartingBattery, error: startBatteryError }] = useStartBatteryMutation();

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
      console.error("Device command error:", deviceCommandError);
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
        {/* Battery Information */}
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
        {isTestsStarted && isBatteryOn && (
          <TestStatistics 
            total={getTestStatistics().total}
            successful={getTestStatistics().successful}
            rejected={getTestStatistics().rejected}
          />
        )}

        {/* Tests List */}
        {isTestsStarted && isBatteryOn && (
          <View className="mt-4 flex-1">
            <TestsList 
              batteryTests={batteryTests}
              isLoadingTests={isLoadingTests}
              isRestartingTests={isRestartingTests}
              isTestError={isTestError}
              refetchTests={refetchTests}
              testStatuses={testStatuses}
              automaticTestResults={automaticTestResults}
              expandedResults={expandedResults}
              runningAutomaticTests={runningAutomaticTests}
              testTimers={testTimers}
              onApproveTest={handleApproveTest}
              onRejectTest={handleRejectTest}
              onResetStatus={handleResetStatus}
              onStartTest={handleStartTest}
              onToggleResultExpansion={toggleResultExpansion}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BatteryDetails; 