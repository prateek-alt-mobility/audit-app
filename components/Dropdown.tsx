import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onSelect,
  placeholder = 'Please Select'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredOptions = options.filter(option => 
    typeof option === 'string' 
      ? option.toLowerCase().includes(searchText.toLowerCase())
      : option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const getDisplayValue = () => {
    if (!value) return placeholder;
    const selectedOption = options.find(opt => 
      typeof opt === 'string' ? opt === value : opt.value === value
    );
    return typeof selectedOption === 'string' ? selectedOption : selectedOption?.label;
  };

  return (
    <View>
      <Text className="text-base mb-2 text-gray-700">{label}</Text>
      <TouchableOpacity
        className="rounded-lg p-4 flex-row justify-between items-center border border-gray-200"
        onPress={() => setIsOpen(true)}
      >
        <Text className={value ? "text-gray-900" : "text-gray-400"}>
          {getDisplayValue()}
        </Text>
        <Entypo name="chevron-small-down" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 bg-black/50">
          <View className="bg-white mt-auto rounded-t-xl">
            <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-lg font-semibold">Select {label}</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text className="text-blue-500">Done</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              className="mx-4 my-2 p-3 bg-gray-100 rounded-lg"
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
            />

            <ScrollView className="max-h-[300px]">
              {filteredOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className={`p-4 border-b border-gray-100 ${
                    (typeof option === 'string' ? option === value : option.value === value)
                      ? 'bg-blue-50'
                      : ''
                  }`}
                  onPress={() => {
                    onSelect(typeof option === 'string' ? option : option.value);
                    setIsOpen(false);
                    setSearchText('');
                  }}
                >
                  <Text className="text-base">
                    {typeof option === 'string' ? option : option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;