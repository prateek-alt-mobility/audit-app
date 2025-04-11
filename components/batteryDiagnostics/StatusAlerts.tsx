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
      <View className="mt-3 items-center">
        <ActivityIndicator size="large" color="#22c55e" />
        <Text className="text-gray-500 mt-2">
          {isBatteryOn ? 'Switching off...' : 'Switching on...'}
        </Text>
      </View>
    );
  }

  if (isLoadingDeviceCommand) {
    return (
      <View className="mt-3 items-center">
        <ActivityIndicator size="large" color="#22c55e" />
        <Text className="text-gray-500 mt-2">
          Loading battery information...
        </Text>
      </View>
    );
  }

  if (deviceCommandError) {
    return (
      <View className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
        <View className="flex-row items-center">
          <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center mr-2">
            <Text className="text-white text-sm">!</Text>
          </View>
          <Text className="text-red-600 flex-1 text-sm">
            Failed to load battery information. Please try again.
          </Text>
        </View>
      </View>
    );
  }

  if (startCommandSent) {
    return (
      <View className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-yellow-500 items-center justify-center mr-2">
            <Text className="text-white text-sm">⟳</Text>
          </View>
          <View className="flex-1">
            <Text className="text-yellow-700 text-sm">
              The battery start command has been successfully sent.
            </Text>
            <Text className="text-yellow-800 font-medium mt-1 text-sm">
              Time elapsed: {formatTime(pollingTime)}
            </Text>
          </View>
        </View>
        
        {/* Polling logs - taller scrollable area */}
        <View className="mt-2 bg-yellow-100 rounded-md p-2 max-h-48">
          <Text className="text-yellow-800 text-xs mb-1 font-medium">Battery startup log:</Text>
          <ScrollView className="max-h-40">
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
      <View className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
        <View className="flex-row items-center">
          <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center mr-2">
            <Text className="text-white text-sm">!</Text>
          </View>
          <Text className="text-red-600 flex-1 text-sm">
            Battery is switched off. You cannot run battery diagnostic tests.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
      <View className="flex-row items-center">
        <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center mr-2">
          <Text className="text-white text-sm">✓</Text>
        </View>
        <View className="flex-1">
          <Text className="text-green-600 text-sm">
            Battery is switched on. You can now run battery diagnostic tests.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={startDiagnosticTest}
        disabled={isRestartingTests}
        className={`bg-green-500 py-2 rounded-lg mt-2 ${isRestartingTests ? 'opacity-50' : ''}`}
      >
        <View className="flex-row items-center justify-center">
          {isRestartingTests ? (
            <>
              <ActivityIndicator size="small" color="white" />
              <Text className="text-white font-medium ml-2 text-sm">
                Restarting Tests...
              </Text>
            </>
          ) : (
            <Text className="text-white text-center font-medium text-sm">
              {isTestsStarted ? 'Restart Battery Diagnostic Tests' : 'Start Battery Diagnostic Test'}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StatusAlerts; 