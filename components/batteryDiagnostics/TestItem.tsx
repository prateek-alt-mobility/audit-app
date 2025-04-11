import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

export type TestType = 'Manual' | 'Automatic';
export type TestStatus = 'pending' | 'approved' | 'rejected';

export interface AutomaticTestResult {
  status: TestStatus;
  message: string;
  timestamp: string;
}

export interface TestItemProps {
  testId: string;
  testName: string;
  testType: TestType;
  testDescription: string;
  testStatus: TestStatus | undefined;
  automaticTestResult?: AutomaticTestResult;
  isRunningTest: boolean;
  testTimer?: number;
  isExpanded: boolean;
  onApprove: (testId: string) => void;
  onReject: (testId: string) => void;
  onReset: (testId: string) => void;
  onStartTest: (testId: string) => void;
  onToggleExpand: (testId: string) => void;
}

const TestItem: React.FC<TestItemProps> = ({
  testId,
  testName,
  testType,
  testDescription,
  testStatus,
  automaticTestResult,
  isRunningTest,
  testTimer,
  isExpanded,
  onApprove,
  onReject,
  onReset,
  onStartTest,
  onToggleExpand
}) => {
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

  const getTestStatusStyles = () => {
    if (!testStatus) return 'border-gray-200';
    
    switch (testStatus) {
      case 'approved':
        return 'bg-green-50 border-green-500';
      case 'rejected':
        return 'bg-red-50 border-red-500';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <View className={`bg-white rounded-lg p-5 shadow-sm border mt-4 ${getTestStatusStyles()}`}>
      <View className="flex-row items-center mb-3">
        {getTestIcon()}
        <View className="flex-1 ml-3">
          <Text className="text-gray-900 font-semibold text-lg">
            {testName}
          </Text>
          <View className="flex-row items-center mt-1">
            <Text className={`text-sm ${testType === 'Manual' ? 'text-blue-600' : 'text-purple-600'}`}>
              {testType === 'Manual' ? (
                <Ionicons name="hand-left" size={14} color="#2563eb" />
              ) : (
                <Ionicons name="flash" size={14} color="#9333ea" />
              )}
              {' '}{testType} Test
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-gray-600 mb-4 text-sm">
        {testDescription}
      </Text>

      {/* Status Pills for Manual Tests */}
      {testType === 'Manual' && testStatus && (
        <View className="mb-4">
          <View 
            className={`self-start rounded-full px-3 py-1 ${
              testStatus === 'approved' 
                ? 'bg-green-100 border border-green-500' 
                : 'bg-red-100 border border-red-500'
            }`}
          >
            <Text 
              className={`text-sm font-medium ${
                testStatus === 'approved' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}
            >
              {testStatus === 'approved' ? '✓ Approved' : '✕ Rejected'}
            </Text>
          </View>
        </View>
      )}

      {/* Automatic Test Results */}
      {testType === 'Automatic' && automaticTestResult && (
        <View className="mb-4">
          <TouchableOpacity
            onPress={() => onToggleExpand(testId)}
            className={`flex-row items-center justify-between p-3 rounded-lg ${
              automaticTestResult.status === 'approved'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name={automaticTestResult.status === 'approved' ? 'check-circle' : 'alert-circle'}
                size={20}
                color={automaticTestResult.status === 'approved' ? '#22c55e' : '#ef4444'}
              />
              <Text className={`ml-2 font-medium ${
                automaticTestResult.status === 'approved' ? 'text-green-600' : 'text-red-600'
              }`}>
                Test {automaticTestResult.status === 'approved' ? 'Passed' : 'Failed'}
              </Text>
            </View>
            <MaterialCommunityIcons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#6b7280"
            />
          </TouchableOpacity>
          
          {isExpanded && (
            <View className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <Text className="text-gray-700 text-sm">
                {automaticTestResult.message}
              </Text>
              <Text className="text-gray-500 text-xs mt-2">
                Completed at: {automaticTestResult.timestamp}
              </Text>
            </View>
          )}
        </View>
      )}

      <View className="flex-row justify-end space-x-3 mt-2">
        {testType === 'Manual' && !testStatus ? (
          <>
            <TouchableOpacity
              onPress={() => onReject(testId)}
              className="flex-row items-center bg-red-50 border border-red-200 px-4 py-2 rounded-lg"
            >
              <Ionicons name="close-circle" size={18} color="#ef4444" />
              <Text className="text-red-600 ml-2 font-medium">Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onApprove(testId)}
              className="flex-row ml-3 items-center bg-green-50 border border-green-200 px-4 py-2 rounded-lg"
            >
              <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
              <Text className="text-green-600 ml-2 font-medium">Approve</Text>
            </TouchableOpacity>
          </>
        ) : testType === 'Manual' ? (
          <TouchableOpacity
            onPress={() => onReset(testId)}
            className="flex-row items-center bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg"
          >
            <Ionicons name="refresh" size={18} color="#3b82f6" />
            <Text className="text-blue-600 ml-2 font-medium">Reset Status</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => onStartTest(testId)}
            disabled={isRunningTest}
            className={`flex-row items-center ${
              isRunningTest
                ? 'bg-purple-50 opacity-50'
                : 'bg-purple-50 border border-purple-200'
            } px-4 py-2 rounded-lg`}
          >
            {isRunningTest ? (
              <>
                <ActivityIndicator size="small" color="#9333ea" />
                <Text className="text-purple-600 ml-2 font-medium">
                  Running Test... {testTimer}s
                </Text>
              </>
            ) : (
              <>
                <FontAwesome5 
                  name={automaticTestResult ? "redo" : "play"} 
                  size={14} 
                  color="#9333ea" 
                />
                <Text className="text-purple-600 ml-2 font-medium">
                  {automaticTestResult ? "Test Again" : "Start Test"}
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TestItem; 