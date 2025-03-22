import { Stack, router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
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
const AuditDashboard = () => {
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const handleVehicleSelect = (type: string) => {
    setShowVehicleModal(false);
    // Navigate to the audit form with vehicle type
    router.push({
      pathname: "/screens/audit-form",
      params: { vehicleType: type },
    });
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Audit Dashboard",
        }}
      />
      <ScrollView className="flex-1">
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
              onPress={() => handleVehicleSelect("2W")}
            />
            <VehicleOption
              title="3 Wheeler"
              onPress={() => handleVehicleSelect("3W")}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AuditDashboard;
