import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

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
  numberOfLines = 4 
}) => {
  return (
    <View style={styles.container}>
      <Text style={[
        styles.label
      ]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          disabled && styles.disabledInput,
          multiline && styles.textArea
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChange}
        editable={!disabled}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
        focusable={!disabled} 
        pointerEvents={disabled ? "none" : "auto"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#000000',
  },
  disabledLabel: {
    color: '#9CA3AF',
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#F3F4F6',
    color: '#9CA3AF',
    borderColor: '#E5E7EB',
    opacity: 0.7,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default Input;