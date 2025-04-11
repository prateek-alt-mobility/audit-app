import { TestResultIdData } from '@/store/services/interfaces/batteryTestRun.interface';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BatteryTest } from '../../store/services/interfaces/batteryTests.interface';
import TestItem, { TestType } from './TestItem';

interface TestsListProps {
  batteryTests?: BatteryTest[];
  isLoadingTests: boolean;
  isRestartingTests: boolean;
  isTestError: boolean;
  refetchTests: () => Promise<any>;
  onStartTest?: (testId: string, testType: TestType) => void;
  onReadyTest?: (testId: string, testType: TestType) => void;
  getTestResultId?: (testId: string) => Promise<TestResultIdData | null>;
  onApproveTest?: (testId: string, resultId: string) => void;
  onRejectTest?: (testId: string, resultId: string) => void;
}

const TestsList: React.FC<TestsListProps> = ({
  batteryTests,
  isLoadingTests,
  isRestartingTests,
  isTestError,
  refetchTests,
  onStartTest,
  onReadyTest,
  getTestResultId,
  onApproveTest,
  onRejectTest
}) => {
  // Get test result IDs from Redux
  const { testResultIds } = useSelector((state: RootState) => state.battery);

  if (isLoadingTests || isRestartingTests) {
    return (
      <View className="items-center py-4">
        <ActivityIndicator size="large" color="#22c55e" />
        <Text className="text-gray-500 mt-2">
          {isRestartingTests ? 'Restarting tests...' : 'Loading tests...'}
        </Text>
      </View>
    );
  }

  if (isTestError) {
    return (
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
    );
  }

  if (!batteryTests || batteryTests.length === 0) {
    return (
      <View className="bg-gray-50 border border-gray-200 rounded-lg p-4 items-center">
        <Text className="text-gray-600 text-center">
          No tests available. Please check your connection and try again.
        </Text>
        <TouchableOpacity
          onPress={refetchTests}
          className="bg-blue-500 py-2 px-4 rounded-lg mt-2"
        >
          <Text className="text-white text-center">Refresh Tests</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView 
        className="space-y-2" 
        contentContainerStyle={{ 
          paddingBottom: 100 
        }}
      >
        {batteryTests.map((test) => (
          <TestItem
            key={test.test_id}
            testId={test.test_id}
            testName={test.test_name}
            testType={test.test_type as TestType}
            testDescription={test.test_description}
            status={test.status}
            testResultId={testResultIds[test.test_id] || null}
            onStartTest={onStartTest}
            onReadyTest={onReadyTest}
            getTestResultId={getTestResultId}
            refetchTests={refetchTests}
            onApproveTest={onApproveTest}
            onRejectTest={onRejectTest}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TestsList; 