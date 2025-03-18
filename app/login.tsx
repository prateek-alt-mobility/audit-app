import { Feather } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import AuthGuard from "./components/AuthGuard";
import { useLoginMutation } from "./store/services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Use the login mutation hook from RTK Query
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<any>({});

  const handleLogin = async () => {
    // Reset previous error messages
    setEmailError("");
    setPasswordError("");
    
    // Validate inputs
    let isValid = true;
    
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }
    
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }
    
    if (!isValid) {
      return;
    }
    
    try {
      // Use the login mutation directly
      await login({ email, password }).unwrap();
      router.replace("/");
    } catch (error) {
      setErrorMessage(error)
      // Error is handled by RTK Query and the auth slice
      console.log("Login failed:", error);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Stack.Screen
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
        <ActivityIndicator size="large" color="black" />
        <Text className="mt-4 text-gray-600">Logging in...</Text>
      </View>
    );
  }

  return (
    <AuthGuard requireAuth={false}>
      <TouchableWithoutFeedback>
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
              {/* Email field */}
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
                    onChangeText={(text) => {
                      setEmail(text);
                      if (emailError) setEmailError("");
                    }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!isLoading}
                  />
                </View>
                {emailError ? <Text className="text-red-500 mt-1">{emailError}</Text> : null}
             
              </View>

              {/* Password field */}
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
                    onChangeText={(text) => {
                      setPassword(text);
                      if (passwordError) setPasswordError("");
                    }}
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
                {passwordError ? <Text className="text-red-500 mt-1">{passwordError}</Text> : null}
              </View>

              {errorMessage ? <Text className="text-red-500 mt-1 text-center">{errorMessage.data?.message}</Text> : null}

              <TouchableOpacity className="items-end">
                <Text className="text-gray-600">Forgot Password?</Text>
              </TouchableOpacity>

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

              <View className="flex-row justify-center mt-4">
                <Text className="text-gray-600">Don't have an account? </Text>
                <TouchableOpacity>
                  <Text className="text-black font-semibold">Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </AuthGuard>
  );
}