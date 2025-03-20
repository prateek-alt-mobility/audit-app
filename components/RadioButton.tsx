import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface RadioButtonProps {
  options: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  selectedValue: string;
  onSelect: (value: string) => void;
  direction?: "row" | "column";
  title?: string;
  disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedValue,
  onSelect,
  title,
  direction = "row",
  disabled = false,
}) => {
  return (
    <View>
      {title && <Text className="text-base mb-2">{title}</Text>}
      <View
        className={`flex-row items-center gap-4 ${
          direction === "column" ? "flex-col" : ""
        }`}
      >
        {options.map((option, index) => {
          const isDisabled = disabled || option.disabled;
          return (
            <TouchableOpacity
              key={index}
              className="flex-row items-center mr-4"
              onPress={() => !isDisabled && onSelect(option.value)}
              disabled={isDisabled}
            >
              <View
                className={`h-5 w-5 rounded-full border-2 items-center justify-center
                ${isDisabled ? "border-gray-400" : "border-black"}`}
              >
                {selectedValue === option.value && (
                  <View
                    className={`h-2.5 w-2.5 rounded-full
                    ${isDisabled ? "bg-gray-400" : "bg-black"}`}
                  />
                )}
              </View>
              <Text className={`ml-2 ${isDisabled ? "text-gray-400" : ""}`}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default RadioButton;
