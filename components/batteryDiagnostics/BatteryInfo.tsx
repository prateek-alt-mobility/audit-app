import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import BatteryPlaceholderImage from "../../assets/images/battery_placeholder.png";

interface BatteryDetailsType {
  batteryNumber: string;
  charge: string;
  discharge: string;
  status: string;
  plantCode: string;
  modelNo: string;
  date: string;
  bmsModelNo: string;
  bmsNumber: string;
  softwareVersion: string;
  leaseDays: string;
}

interface BatteryInfoProps {
  batteryDetails: BatteryDetailsType;
  isBatteryOn: boolean;
  isLoading: boolean;
  isLoadingDeviceCommand: boolean;
  toggleBattery: () => void;
  startCommandSent?: boolean;
}

const BatteryInfo: React.FC<BatteryInfoProps> = ({ 
  batteryDetails, 
  isBatteryOn, 
  isLoading, 
  isLoadingDeviceCommand, 
  toggleBattery,
  startCommandSent = false
}) => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <View className="flex-row">
        {/* Left side - Battery Image with Status Indicator */}
        <View className="w-1/4 items-center justify-center relative">
          <Image 
            source={BatteryPlaceholderImage as ImageSourcePropType}
            className="w-20 h-20"
            resizeMode="contain"
          />
          <View 
            className={`absolute top-0 right-0 w-4 h-4 rounded-full ${
              isBatteryOn ? 'bg-green-500' : startCommandSent ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          />
        </View>

        {/* Right side - Battery Details */}
        <View className="w-3/4 pl-2">
          <View className="flex-row justify-between items-start">
            <Text className="text-gray-900 text-lg font-semibold">
              Battery {batteryDetails.batteryNumber}
            </Text>
            
            <TouchableOpacity 
              onPress={() => setShowAdditionalInfo(!showAdditionalInfo)}
              className="p-1"
            >
              <MaterialIcons 
                name={showAdditionalInfo ? "expand-less" : "expand-more"} 
                size={20} 
                color="#4b5563" 
              />
            </TouchableOpacity>
          </View>
          
          <View className="flex-row flex-wrap">
            <View className="w-1/2 pr-1 mb-1">
              <Text className="text-gray-500 text-xs">Model</Text>
              <Text className="text-gray-700">{batteryDetails.modelNo}</Text>
            </View>
            <View className="w-1/2 pl-1 mb-1">
              <Text className="text-gray-500 text-xs">Status</Text>
              <Text className="text-gray-700">{batteryDetails.status}</Text>
            </View>
            <View className="w-1/2 pr-1 mb-1">
              <Text className="text-gray-500 text-xs">Charge</Text>
              <Text className="text-gray-700">{batteryDetails.charge}</Text>
            </View>
            <View className="w-1/2 pl-1 mb-1">
              <Text className="text-gray-500 text-xs">Discharge</Text>
              <Text className="text-gray-700">{batteryDetails.discharge}</Text>
            </View>
          </View>
          
          {!isBatteryOn && !startCommandSent && (
            <TouchableOpacity
              onPress={toggleBattery}
              disabled={isLoading || isLoadingDeviceCommand}
              className={`py-2 px-4 rounded-lg mt-1 bg-green-500 ${
                (isLoading || isLoadingDeviceCommand) ? 'opacity-50' : ''
              }`}
            >
              <Text className="text-white text-center font-medium">
                {isLoadingDeviceCommand ? 'Loading...' : 'Switch On'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Additional Battery Details - Expandable */}
      {showAdditionalInfo && (
        <View className="mt-3 pt-3 border-t border-gray-100">
          <Text className="text-gray-700 font-medium mb-2">Additional Information</Text>
          <View className="flex-row flex-wrap">
            <View className="w-1/3 mb-2">
              <Text className="text-gray-500 text-xs">Plant Code</Text>
              <Text className="text-gray-700">{batteryDetails.plantCode}</Text>
            </View>
            <View className="w-1/3 mb-2">
              <Text className="text-gray-500 text-xs">Manufacturing Date</Text>
              <Text className="text-gray-700">{batteryDetails.date}</Text>
            </View>
            <View className="w-1/3 mb-2">
              <Text className="text-gray-500 text-xs">Lease Days</Text>
              <Text className="text-gray-700">{batteryDetails.leaseDays}</Text>
            </View>
            <View className="w-1/3 mb-2">
              <Text className="text-gray-500 text-xs">BMS Model</Text>
              <Text className="text-gray-700">{batteryDetails.bmsModelNo}</Text>
            </View>
            <View className="w-1/3 mb-2">
              <Text className="text-gray-500 text-xs">BMS Number</Text>
              <Text className="text-gray-700">{batteryDetails.bmsNumber}</Text>
            </View>
            <View className="w-1/3 mb-2">
              <Text className="text-gray-500 text-xs">Software Version</Text>
              <Text className="text-gray-700">{batteryDetails.softwareVersion}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default BatteryInfo;
export type { BatteryDetailsType };
