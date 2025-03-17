import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useCreateAuditMutation } from "./store/services/auditApi";

interface AuditImage {
  uri: string;
  type: "image";
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function AuditForm() {
  const { vehicleType } = useLocalSearchParams();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const router = useRouter();
  
  // Use the createAudit mutation from RTK Query
  const [createAudit, { isLoading, isSuccess, error }] = useCreateAuditMutation();

  // If the audit was successfully created, navigate back to the main screen
  useEffect(() => {
    if (isSuccess) {
      Alert.alert("Success", "Audit created successfully");
      router.back();
    }
  }, [isSuccess, router]);

  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!imageUri) {
      Alert.alert("Error", "Please select an image");
      return;
    }

    try {
      // Create the audit using RTK Query
      await createAudit({
        vehicleType: vehicleType as string,
        // Add other fields as needed
        // image: imageUri, // You would need to handle file uploads separately
        notes,
      }).unwrap();
    } catch (err) {
      console.error("Failed to create audit:", err);
      Alert.alert("Error", "Failed to create audit. Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: `${vehicleType} Audit`,
          headerShown: true,
        }}
      />

      <ScrollView className="flex-1 p-4">
        <View className="items-center my-6">
          <TouchableOpacity 
            className="bg-gray-100 p-6 rounded-xl items-center justify-center"
            style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 0.6 }}
            onPress={pickImage}
          >
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            ) : (
              <View className="items-center">
                <Feather name="camera" size={48} color="gray" />
                <Text className="text-gray-500 mt-2">Tap to add photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 mb-2">Notes</Text>
          <TextInput
            className="bg-gray-50 p-4 rounded-xl"
            placeholder="Add notes about this audit"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {error && (
          <Text className="text-red-500 text-center mb-4">
            {typeof error === 'object' && 'message' in error 
              ? error.message as string 
              : 'An error occurred'}
          </Text>
        )}

        <TouchableOpacity
          className="bg-black py-4 rounded-xl mt-4"
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold">
              Submit Audit
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
