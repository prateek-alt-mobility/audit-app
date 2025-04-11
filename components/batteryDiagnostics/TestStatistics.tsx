import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface TestStatisticsProps {
  total: number;
  successful: number;
  rejected: number;
}

const TestStatistics: React.FC<TestStatisticsProps> = ({
  total,
  successful,
  rejected
}) => {
  return (
    <View className="mt-4 flex-row justify-between gap-x-3 space-x-3">
      <View className="flex-1 bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-sm">
        <Text className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Total Tests</Text>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="clipboard-list" size={16} color="#6b7280" />
          <Text className="text-gray-900 font-medium text-base ml-1.5">
            {total}
          </Text>
        </View>
      </View>
      
      <View className="flex-1 bg-green-50 rounded-lg px-3 py-2 border border-green-200 shadow-sm">
        <Text className="text-green-600 text-[10px] uppercase tracking-wider mb-1">Successful</Text>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="check-circle" size={16} color="#22c55e" />
          <Text className="text-green-600 font-medium text-base ml-1.5">
            {successful}
          </Text>
        </View>
      </View>
      
      <View className="flex-1 bg-red-50 rounded-lg px-3 py-2 border border-red-200 shadow-sm">
        <Text className="text-red-600 text-[10px] uppercase tracking-wider mb-1">Failed</Text>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="close-circle" size={16} color="#ef4444" />
          <Text className="text-red-600 font-medium text-base ml-1.5">
            {rejected}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TestStatistics; 