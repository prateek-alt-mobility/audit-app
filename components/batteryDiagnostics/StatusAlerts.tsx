import React from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface StatusAlertsProps {
  isBatteryOn: boolean;
  isLoading: boolean;
  isLoadingDeviceCommand: boolean;
  isRestartingTests: boolean;
  isTestsStarted: boolean;
  deviceCommandError: any;
  startDiagnosticTest: () => void;
  startCommandSent?: boolean;
  pollingTime?: number;
  pollingLogs?: string[];
}

// Helper function to format time as mm:ss
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const StatusAlerts: React.FC<StatusAlertsProps> = ({
  isBatteryOn,
  isLoading,
  isLoadingDeviceCommand,
  isRestartingTests,
  isTestsStarted,
  deviceCommandError,
  startDiagnosticTest,
  startCommandSent = false,
  pollingTime = 0,
  pollingLogs = []
}) => {
  if (isLoading) {
    return (
      <View className="mt-4 items-center">
        <ActivityIndicator size="large" color="#22c55e" />
        <Text className="text-gray-500 mt-2">
          {isBatteryOn ? 'Switching off...' : 'Switching on...'}
        </Text>
      </View>
    );
  }

  if (isLoadingDeviceCommand) {
    return (
      <View className="mt-4 items-center">
        <ActivityIndicator size="large" color="#22c55e" />
        <Text className="text-gray-500 mt-2">
          Loading battery information...
        </Text>
      </View>
    );
  }

  if (deviceCommandError) {
    return (
      <View className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-red-500 items-center justify-center mr-3">
            <Text className="text-white text-lg">!</Text>
          </View>
          <Text className="text-red-600 flex-1">
            Failed to load battery information. Please try again.
          </Text>
        </View>
      </View>
    );
  }

  if (startCommandSent) {
    return (
      <View className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <View className="flex-row items-center mb-2">
          <View className="w-8 h-8 rounded-full bg-yellow-500 items-center justify-center mr-3">
            <Text className="text-white text-lg">⟳</Text>
          </View>
          <View className="flex-1">
            <Text className="text-yellow-700">
              The battery start command has been successfully sent. Waiting for the battery to get turned on.
            </Text>
            <Text className="text-yellow-800 font-medium mt-2">
              Time elapsed: {formatTime(pollingTime)}
            </Text>
          </View>
        </View>
        
        {/* Polling logs */}
        <View className="mt-3 bg-yellow-100 rounded-md p-2 max-h-32">
          <ScrollView>
            {pollingLogs.map((log, index) => (
              <Text key={index} className="text-yellow-800 text-xs mb-1">{log}</Text>
            ))}
            {pollingLogs.length === 0 && (
              <Text className="text-yellow-800 text-xs italic">Waiting for battery response...</Text>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  if (!isBatteryOn) {
    return (
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
    );
  }

  return (
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
  );
};

export default StatusAlerts; 