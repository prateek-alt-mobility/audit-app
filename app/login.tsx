import { Feather } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { loginUser } from "./store/slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      // Navigate to main screen on successful login
      router.replace("/");
    } catch (err) {
      // Error is handled in the reducer
      console.log("Login failed:", err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View className="flex-1 bg-white p-6">
      <Stack.Screen
        options={{
          title: "Login",
          headerShown: false,
        }}
      />

      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold mb-8 text-center">
          Welcome Back
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-600 mb-2">Email</Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl">
              <View className="p-4">
                <Feather name="mail" size={20} color="gray" />
              </View>
              <TextInput
                className="flex-1 p-4"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!isLoading}
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Password</Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl">
              <View className="p-4">
                <Feather name="lock" size={20} color="gray" />
              </View>
              <TextInput
                className="flex-1 p-4"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                className="p-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          {error && <Text className="text-red-500 text-center">{error}</Text>}

         

          <TouchableOpacity
            className="bg-black py-4 rounded-xl mt-4 flex-row justify-center items-center space-x-2"
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Feather name="log-in" size={20} color="white" />
                <Text className="text-white text-center font-semibold">
                  Login
                </Text>
              </>
            )}
          </TouchableOpacity>

         
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
