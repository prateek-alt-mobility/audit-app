import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { parseQRCodeData } from '../../store/slices/batterySlice';

const QRScanner = () => {
  const dispatch = useDispatch();
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(true);
  const [scanningMessage, setScanningMessage] = useState('Scanning QR Code...');
  const [error, setError] = useState<string | null>(null);

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

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanning) return;
    
    setScanning(false);
    setScanningMessage('QR Code Detected!');
    
    try {
      // Process the QR code data using Redux
      dispatch(parseQRCodeData(data));
      
      // Wait a moment to show success before navigating back
      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (err) {
      setError('Invalid QR Code format');
      setScanningMessage('Scan failed');
      
      // Reset after error
      setTimeout(() => {
        setScanning(true);
        setScanningMessage('Scanning QR Code...');
        setError(null);
      }, 2000);
    }
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-white mt-4 text-lg">Requesting camera permission</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center px-4">
          <MaterialCommunityIcons name="camera-off" size={64} color="#ef4444" />
          <Text className="text-white text-center mt-4 text-lg">
            No access to camera. Please enable camera permissions to scan QR codes.
          </Text>
          <TouchableOpacity 
            className="mt-6 bg-blue-500 py-3 px-8 rounded-lg"
            onPress={() => requestPermission()}
          >
            <Text className="text-white font-bold text-lg">Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Scan Battery QR Code",
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="ml-2">
              <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      
      <View className="flex-1">
        {/* Camera View */}
        <CameraView
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={scanning ? handleBarCodeScanned : undefined}
          style={StyleSheet.absoluteFillObject}
        />
        
        {/* Scanner Overlay */}
        <View className="flex-1 justify-center items-center">
          {/* Floating Box with scanner animation */}
          <View className="w-72 h-72 bg-transparent border-4 border-blue-500 rounded-lg overflow-hidden relative">
            {/* Scanning indicator */}
            {scanning && (
              <View className="absolute inset-0 flex justify-center items-center">
                <View className="w-full h-0.5 bg-blue-500 absolute opacity-80 animate-scan" />
              </View>
            )}
            
            {/* Corner highlights */}
            <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white" />
            <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white" />
            <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white" />
            <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white" />
          </View>
          
          {/* Scanning Text/Status */}
          <View className="bg-black/70 px-6 py-3 rounded-lg mt-6">
            <Text className={`text-lg font-medium ${error ? 'text-red-500' : 'text-white'}`}>
              {error || scanningMessage}
            </Text>
          </View>
          
          {/* Instructions */}
          <Text className="text-white/70 text-center px-8 mt-8">
            Position the QR code within the square and hold steady
          </Text>
        </View>
        
        {/* Bottom action button */}
        <View className="absolute bottom-0 left-0 right-0 p-6">
          <TouchableOpacity 
            className="bg-white/10 py-4 rounded-xl items-center"
            onPress={() => router.back()}
          >
            <Text className="text-white font-bold text-lg">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QRScanner;

// Add animation via stylesheet if needed
const styles = StyleSheet.create({}); 