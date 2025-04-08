import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraType, useCameraPermissions } from 'expo-camera';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setSerialNumber } from '../../store/slices/batterySlice';

const BatteryDiagnostics = () => {
  const dispatch = useDispatch();
  const { serialNumber } = useSelector((state: RootState) => state.battery);
  
  const [batteryNumber, setBatteryNumber] = useState('');
  const [facing, _setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  // Update local state when Redux state changes
  useEffect(() => {
    if (serialNumber) {
      setBatteryNumber(serialNumber);
    }
  }, [serialNumber]);

  useEffect(() => {
    const getCameraPermissions = async () => {
      if (!permission) {
        await requestPermission();
        return;
      }
      setHasPermission(permission.granted);
    };

    getCameraPermissions();
  }, [permission, requestPermission]);

  const handleBarCodeScanned = ({ data }: any) => {
    console.log('data', data);
    
    // Extract serial number from QR code data
    const serialNumberMatch = data.match(/Serial Number - ([^\n]+)/);
    const serialNumber = serialNumberMatch ? serialNumberMatch[1].trim() : '';
    
    console.log('Serial Number:', serialNumber);
    
    setScanned(true);
    setBatteryNumber(serialNumber);
  };

  const resetScanner = () => {
    setScanned(false);
  };

  const handleBatteryNumberChange = (text: string) => {
    setBatteryNumber(text);
    dispatch(setSerialNumber(text));
  };

  const navigateToQRScanner = () => {
    router.push('/screens/qr-scanner');
  };

  if (hasPermission === null) {
    return <View className="flex-1 items-center justify-center bg-black"><Text className="text-white">Requesting camera permission</Text></View>;
  }

  if (hasPermission === false) {
    return <View className="flex-1 items-center justify-center bg-black"><Text className="text-white">No access to camera</Text></View>;
  }

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
        {/* Instructions */}
        <Text className="text-white text-lg mb-4 text-center px-6">
          Enter the battery serial number or scan QR code
        </Text>
        
        {/* QR Code Scanner Option */}
        <TouchableOpacity 
          onPress={navigateToQRScanner}
          className="bg-gray-800 rounded-full w-40 h-40 mb-8 items-center justify-center"
        >
          <MaterialCommunityIcons name="qrcode-scan" size={64} color="#3b82f6" />
          <Text className="text-white mt-2 text-center">Scan QR Code</Text>
        </TouchableOpacity>

        {/* Battery Number Input with QR Button */}
        <View className="w-80 px-4">
          <View className="flex-row mb-4">
            <TextInput
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg rounded-r-none"
              placeholder="Enter Battery Number"
              placeholderTextColor="#666"
              value={batteryNumber}
              onChangeText={handleBatteryNumberChange}
            />
            <TouchableOpacity 
              className="bg-gray-700 px-3 rounded-r-lg items-center justify-center"
              onPress={navigateToQRScanner}
            >
              <MaterialCommunityIcons name="qrcode-scan" size={24} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          {/* Start Diagnostics Button */}
          <TouchableOpacity 
            className={`py-3 rounded-lg items-center ${batteryNumber.trim() ? 'bg-blue-500' : 'bg-blue-500/30'}`}
            onPress={() => {
              if (batteryNumber.trim()) {
                router.push('/screens/battery-details');
              }
            }}
            disabled={!batteryNumber.trim()}
          >
            <Text className="text-white font-bold text-lg">Start Diagnostics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BatteryDiagnostics; 