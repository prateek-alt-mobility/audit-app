import React from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import TestItem, { AutomaticTestResult, TestStatus, TestType } from './TestItem';

interface TestData {
  test_id: string;
  test_name: string;
  test_type: string;
  test_description: string;
}

interface TestsListProps {
  batteryTests?: TestData[];
  isLoadingTests: boolean;
  isRestartingTests: boolean;
  isTestError: boolean;
  refetchTests: () => void;
  testStatuses: Record<string, TestStatus>;
  automaticTestResults: Record<string, AutomaticTestResult>;
  expandedResults: string[];
  runningAutomaticTests: string[];
  testTimers: Record<string, number>;
  onApproveTest: (testId: string) => void;
  onRejectTest: (testId: string) => void;
  onResetStatus: (testId: string) => void;
  onStartTest: (testId: string) => void;
  onToggleResultExpansion: (testId: string) => void;
}

const TestsList: React.FC<TestsListProps> = ({
  batteryTests,
  isLoadingTests,
  isRestartingTests,
  isTestError,
  refetchTests,
  testStatuses,
  automaticTestResults,
  expandedResults,
  runningAutomaticTests,
  testTimers,
  onApproveTest,
  onRejectTest,
  onResetStatus,
  onStartTest,
  onToggleResultExpansion
}) => {
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

  return (
    <ScrollView 
      className="space-y-4" 
      contentContainerStyle={{ 
        paddingBottom: 100 
      }}
    >
      {batteryTests?.map((test) => (
        <TestItem
          key={test.test_id}
          testId={test.test_id}
          testName={test.test_name}
          testType={test.test_type as TestType}
          testDescription={test.test_description}
          testStatus={testStatuses[test.test_id]}
          automaticTestResult={automaticTestResults[test.test_id]}
          isRunningTest={runningAutomaticTests.includes(test.test_id)}
          testTimer={testTimers[test.test_id]}
          isExpanded={expandedResults.includes(test.test_id)}
          onApprove={onApproveTest}
          onReject={onRejectTest}
          onReset={onResetStatus}
          onStartTest={onStartTest}
          onToggleExpand={onToggleResultExpansion}
        />
      ))}
    </ScrollView>
  );
};

export default TestsList; 