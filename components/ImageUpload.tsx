import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ImageUploadProps {
  label: string;
  value?: string[];
  onChange: (images: string[]) => void;
  error?: string;
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value = [],
  onChange,
  error,
  multiple = false,
}) => {
  const [images, setImages] = useState<string[]>(value);

  const pickImage = async (useCamera: boolean) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        quality: 0,
        allowsMultipleSelection: multiple,
      });

      if (!result.canceled) {
        const newImages = result.assets.map((asset) => asset.uri);
        const updatedImages = multiple ? [...images, ...newImages] : newImages;
        setImages(updatedImages);
        onChange(updatedImages);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        // allowsEditing: true,
        quality: 0,
      });

      if (!result.canceled) {
        const newImage = result.assets[0].uri;
        const updatedImages = multiple ? [...images, newImage] : [newImage];
        setImages(updatedImages);
        onChange(updatedImages);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert("Select Image", "Choose an option", [
      {
        text: "Gallery",
        onPress: () => pickImage(false),
      },
      {
        text: "Camera",
        onPress: takePhoto,
      },
      {
        text: "Cancel",
        style: "destructive",
      },
    ]);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onChange(updatedImages);
  };

  return (
    <View className="mb-8">
      <Text className="text-base font-medium mb-2">{label}</Text>
      <View className="flex-row space-x-2">
        {images.length > 0 ? (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-1"
            >
              <View className="flex-row py-2 gap-2">
                {images.map((uri, index) => (
                  <View key={index} className="relative">
                    <Image
                      source={{ uri }}
                      className="w-24 h-24 rounded-lg"
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      onPress={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                    >
                      <MaterialIcons name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
            {multiple && (
              <TouchableOpacity
                onPress={showImagePickerOptions}
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center bg-gray-50"
              >
                <MaterialIcons name="add" size={32} color="#9CA3AF" />
                <Text className="text-gray-500 text-xs mt-1">Add More</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <TouchableOpacity
            onPress={showImagePickerOptions}
            className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center bg-gray-50"
          >
            <MaterialIcons
              name="add-photo-alternate"
              size={32}
              color="#9CA3AF"
            />
            <Text className="text-gray-500 text-xs mt-1">Add Photo</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default ImageUpload;
