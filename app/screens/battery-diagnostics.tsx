import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { Image, ImageSourcePropType, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QRScannerImage: ImageSourcePropType = require("../../assets/images/qr_scanner.png");

const BatteryDiagnostics = () => {
  const [batteryNumber, setBatteryNumber] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Battery Diagnostics",
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <View className="flex-1 items-center justify-start pt-10">
        {/* QR Code Scanner Placeholder */}
        <View className="w-64 h-64 bg-gray-800 rounded-lg items-center justify-center mb-8">
          <Image 
            source={QRScannerImage}
            className="w-40 h-40"
            resizeMode="contain"
          />
          <Text className="text-white mt-2">Scan QR Code</Text>
        </View>

        {/* Battery Number Input */}
        <View className="w-80 px-4">
          <TextInput
            className="bg-gray-800 text-white px-4 py-3 rounded-lg mb-4"
            placeholder="Enter Battery Number"
            placeholderTextColor="#666"
            value={batteryNumber}
            onChangeText={setBatteryNumber}
          />

          {/* Start Diagnostics Button */}
          <TouchableOpacity 
            className="bg-blue-500 py-3 rounded-lg items-center"
            onPress={() => {
              router.push('/screens/battery-details');
            }}
          >
            <Text className="text-white font-bold text-lg">Start Diagnostics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BatteryDiagnostics; 