import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "./store/hooks";
import { logoutUser } from "./store/slices/authSlice";
import { AuthGuard } from "./store/services/AuthGuard";

export default function LandingPage() {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.replace('/login');
  };

  return (
    <AuthGuard requireAuth={true}>
      <SafeAreaView className="flex-1 bg-white">
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Home",
          }}
        />
        <View className="flex-1 px-4 py-4">
          {/* Header with Logo and Logout */}
          <View className="flex-row justify-between items-center mb-8">
            <Text className="text-2xl font-bold text-gray-800">Home</Text>
            <TouchableOpacity
              className="bg-black px-5 py-2 rounded-full"
              onPress={handleLogout}
            >
              <Text className="text-white font-semibold">Logout</Text>
            </TouchableOpacity>
          </View>

          {/* Main Navigation Cards */}
          <View className="flex-1">
            <Text className="text-xl font-semibold text-gray-700 mb-4">
              Quick Actions
            </Text>

            <View className="flex-row flex-wrap justify-between w-full">
              {/* Audit Card */}
              <TouchableOpacity
                className="bg-blue-50 w-[100%] rounded-xl p-4 mb-4 shadow-sm"
                onPress={() => router.push("/screen/Audit/audit")}
              >
                <View className="bg-blue-500 w-12 h-12 rounded-full items-center justify-center mb-3">
                  <Text className="text-white text-xl">📋</Text>
                </View>
                <Text className="text-lg font-bold text-gray-800">Audit</Text>
                <Text className="text-sm text-gray-600 mt-1">
                  Create new audit report
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </AuthGuard>
  );
}