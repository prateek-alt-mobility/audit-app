import React from 'react';
import { Text, View } from 'react-native';

interface TestStatisticsProps {
  total: number;
  notStarted?: number;
  pending?: number;
  approved?: number;
  rejected?: number;
}

const TestStatistics: React.FC<TestStatisticsProps> = ({
  total,
  notStarted = 0,
  pending = 0,
  approved = 0,
  rejected = 0
}) => {
  return (
    <View className="mt-3 bg-white rounded-lg border border-gray-200 shadow-sm p-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-700 font-medium text-sm">Test Statistics</Text>
        <Text className="text-gray-500 text-xs">Total: {total}</Text>
      </View>
      
      <View className="flex-row justify-between mt-2">
        <View className="flex-1 flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-gray-300 mr-1" />
          <Text className="text-gray-600 text-xs mr-1">Not Started:</Text>
          <Text className="text-gray-700 font-medium">{notStarted}</Text>
        </View>
        
        <View className="flex-1 flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-blue-400 mr-1" />
          <Text className="text-blue-600 text-xs mr-1">Pending:</Text>
          <Text className="text-blue-700 font-medium">{pending}</Text>
        </View>
        
        <View className="flex-1 flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-green-400 mr-1" />
          <Text className="text-green-600 text-xs mr-1">Approved:</Text>
          <Text className="text-green-700 font-medium">{approved}</Text>
        </View>
        
        <View className="flex-1 flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-red-400 mr-1" />
          <Text className="text-red-600 text-xs mr-1">Rejected:</Text>
          <Text className="text-red-700 font-medium">{rejected}</Text>
        </View>
      </View>
    </View>
  );
};

export default TestStatistics; 