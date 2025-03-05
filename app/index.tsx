import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Counter from "./components/Counter";
import Posts from "./components/Posts";

interface StatisticProps {
  label: string;
  value: string;
}

const StatisticItem = ({ label, value }: StatisticProps) => (
  <View className="flex-row justify-between items-center py-2">
    <Text className="text-gray-600">{label}</Text>
    <Text className="font-semibold">{value}</Text>
  </View>
);

const VehicleOption = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row justify-between items-center bg-white border border-gray-200 p-4 rounded-xl mb-4"
  >
    <Text className="text-lg">{title}</Text>
    <Text className="text-gray-400">→</Text>
  </TouchableOpacity>
);

export default function LandingPage() {
  const [showVehicleModal, setShowVehicleModal] = useState(false);

  const handleVehicleSelect = (type: string) => {
    setShowVehicleModal(false);
    // Navigate to the audit form with vehicle type
    router.push({
      pathname: "/audit-form",
      params: { vehicleType: type },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <StatusBar style="dark" />

      <ScrollView className="flex-1">
        {/* Login Button */}
        <View className="items-end px-4 py-2">
          <TouchableOpacity
            className="bg-black px-6 py-2 rounded-md"
            onPress={() => router.push("/login")}
          >
            <Text className="text-white font-semibold">Login</Text>
          </TouchableOpacity>
        </View>

        {/* Counter Test */}
        {/* <View className="px-4 mb-6">
          <Text className="text-lg text-center mb-2">Redux Test Counter</Text>
          <Counter />
        </View> */}

        {/* RTK Query Test */}
        {/* <View className="mb-6">
          <Text className="text-lg text-center mb-2">RTK Query Test</Text>
          <Posts />
        </View> */}

        {/* Main Content */}
        <View className="px-4 py-6">
          <View className="bg-gray-50 p-4 rounded-xl mb-6">
            <StatisticItem label="Total Audits Completed:" value="0" />
            <StatisticItem label="Audits This Month:" value="0" />
            <StatisticItem label="Average Time per Audit:" value="0 mins" />
          </View>

          {/* Action Buttons */}
          <TouchableOpacity className="bg-black py-4 rounded-xl mb-4">
            <Text className="text-white text-center font-semibold">
              View Audit History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-black py-4 rounded-xl mb-6"
            onPress={() => setShowVehicleModal(true)}
          >
            <Text className="text-white text-center font-semibold">
              Start New Audit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Black Overlay */}
      {showVehicleModal && <View className="absolute inset-0 bg-black/50" />}

      {/* Vehicle Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showVehicleModal}
        onRequestClose={() => setShowVehicleModal(false)}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-semibold">Select Vehicle Type</Text>
              <TouchableOpacity onPress={() => setShowVehicleModal(false)}>
                <Text className="text-gray-500 text-lg">✕</Text>
              </TouchableOpacity>
            </View>

            <VehicleOption
              title="2 Wheeler"
              onPress={() => handleVehicleSelect("2-wheeler")}
            />
            <VehicleOption
              title="3 Wheeler"
              onPress={() => handleVehicleSelect("3-wheeler")}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
