import React from 'react';
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
  return (
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
              isBatteryOn ? 'bg-green-500' : startCommandSent ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          />
        </View>

        {/* Right side - Battery Details */}
        <View className="w-2/3 pl-4">
          <Text className="text-gray-900 text-lg font-semibold mb-2">
            Battery {batteryDetails.batteryNumber}
          </Text>
          <Text className="text-gray-600 mb-1">
            Model: {batteryDetails.modelNo}
          </Text>
          <Text className="text-gray-600 mb-1">
            Charge: {batteryDetails.charge}
          </Text>
          <Text className="text-gray-600 mb-1">
            Discharge: {batteryDetails.discharge}
          </Text>
          <Text className="text-gray-600 mb-1">
            Status: {batteryDetails.status}
          </Text>
          
          {!isBatteryOn && !startCommandSent && (
            <TouchableOpacity
              onPress={toggleBattery}
              disabled={isLoading || isLoadingDeviceCommand}
              className={`py-2 px-4 rounded-lg mt-2 bg-green-500 ${
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

      {/* Additional Battery Details */}
      <View className="mt-4 pt-4 border-t border-gray-100">
        <Text className="text-gray-700 font-medium mb-2">Additional Information</Text>
        <View className="flex-row flex-wrap">
          <View className="w-1/2 mb-2">
            <Text className="text-gray-500 text-xs">Plant Code</Text>
            <Text className="text-gray-700">{batteryDetails.plantCode}</Text>
          </View>
          <View className="w-1/2 mb-2">
            <Text className="text-gray-500 text-xs">Manufacturing Date</Text>
            <Text className="text-gray-700">{batteryDetails.date}</Text>
          </View>
          <View className="w-1/2 mb-2">
            <Text className="text-gray-500 text-xs">BMS Model</Text>
            <Text className="text-gray-700">{batteryDetails.bmsModelNo}</Text>
          </View>
          <View className="w-1/2 mb-2">
            <Text className="text-gray-500 text-xs">BMS Number</Text>
            <Text className="text-gray-700">{batteryDetails.bmsNumber}</Text>
          </View>
          <View className="w-1/2 mb-2">
            <Text className="text-gray-500 text-xs">Software Version</Text>
            <Text className="text-gray-700">{batteryDetails.softwareVersion}</Text>
          </View>
          <View className="w-1/2 mb-2">
            <Text className="text-gray-500 text-xs">Lease Days</Text>
            <Text className="text-gray-700">{batteryDetails.leaseDays}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BatteryInfo;
export type { BatteryDetailsType };
