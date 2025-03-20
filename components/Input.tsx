import React from "react";
import { Text, TextInput, View } from "react-native";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  multiline = false,
  numberOfLines = 4,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-base font-medium mb-2 text-black">{label}</Text>
      <TextInput
        className={`w-full p-3 rounded-lg border border-gray-200 bg-white
          ${
            disabled
              ? "bg-gray-100 text-gray-400 border-gray-200 opacity-70"
              : ""
          }
          ${multiline ? "min-h-[100px] text-top" : ""}`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChange}
        editable={!disabled}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        textAlignVertical={multiline ? "top" : "center"}
        focusable={!disabled}
        pointerEvents={disabled ? "none" : "auto"}
      />
    </View>
  );
};

export default Input;
