import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Dimensions,
  Button,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, Feather } from "@expo/vector-icons";

interface AuditImage {
  uri: string;
  type: "image";
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function AuditForm() {
  const { vehicleType } = useLocalSearchParams();
  const [imageUri, setImageUri] = useState<string | null>(null);

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
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: `${vehicleType} Audit`,
          headerShown: true,
        }}
      />

      <ScrollView className="flex-1 p-4">
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Button title="Pick an Image" onPress={pickImage} />

          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200, marginTop: 20 }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
