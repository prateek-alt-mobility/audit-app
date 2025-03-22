import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Option {
  label: string;
  value: string | number;
  [key: string]: any; // For any additional properties
}

interface DropdownProps {
  label: string;
  options: (Option | string)[];
  value: string | number;
  onSelect: (value: string | number) => void;
  placeholder?: string;
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onSelect,
  placeholder = "Please Select",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredOptions = options.filter((option) =>
    typeof option === "string"
      ? option.toLowerCase().includes(searchText.toLowerCase())
      : option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const getDisplayValue = () => {
    if (!value) return placeholder;
    const selectedOption = options.find((opt) =>
      typeof opt === "string" ? opt === value : opt.value === value
    );
    return typeof selectedOption === "string"
      ? selectedOption
      : selectedOption?.label;
  };

  return (
    <View className="mb-8">
      <Text className="text-base font-medium mb-2 text-black">{label}</Text>
      <TouchableOpacity
        className={`rounded-lg p-3 flex-row justify-between items-center border ${
          error ? "border-red-500" : "border-gray-200"
        }`}
        onPress={() => setIsOpen(true)}
      >
        <Text className={value ? "text-gray-900" : "text-gray-400"}>
          {getDisplayValue()}
        </Text>
        <Entypo name="chevron-small-down" size={16} color="black" />
      </TouchableOpacity>
      {error && <Text className="text-red-500 mt-1 text-sm">{error}</Text>}

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <TouchableOpacity
            className="bg-white pb-4 mt-auto rounded-t-xl"
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-lg font-semibold">Select {label}</Text>
              <TouchableOpacity
                className="pr-2"
                onPress={() => setIsOpen(false)}
              >
                <Entypo name="cross" size={16} color="black" />
              </TouchableOpacity>
            </View>

            {/* <TextInput
              className="mx-4 my-2 p-3 bg-gray-100 rounded-lg"
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
            /> */}

            <ScrollView className="max-h-[300px]">
              {filteredOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className={`p-4 border-b border-gray-100 ${
                    (
                      typeof option === "string"
                        ? option === value
                        : option.value === value
                    )
                      ? "bg-blue-50"
                      : ""
                  }`}
                  onPress={() => {
                    onSelect(
                      typeof option === "string" ? option : option.value
                    );
                    setIsOpen(false);
                    setSearchText("");
                  }}
                >
                  <Text className="text-base">
                    {typeof option === "string" ? option : option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Dropdown;
