import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
interface RadioButtonProps {
  options: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  selectedValue: string;
  onSelect: (value: string) => void;
  direction?: 'row' | 'column';
  title?:string,
  disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedValue,
  onSelect,
  title,
  direction = 'row',
  disabled=false
}) => {
  return (
   
    <View>
    {title && <Text style={[styles.title]}>{title}</Text>}
    <View style={styles.container}>
      {options.map((option, index) => {
        const isDisabled = disabled || option.disabled;
        return (
          <TouchableOpacity
            key={index}
            style={styles.optionContainer}
            onPress={() => !isDisabled && onSelect(option.value)}
            disabled={isDisabled}
          >
            <View style={[styles.radioOuter, isDisabled && styles.disabledOuter]}>
              {selectedValue === option.value && (
                <View style={[styles.radioInner, isDisabled && styles.disabledInner]} />
              )}
            </View>
            <Text style={[styles.label, isDisabled && styles.disabledText]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  label: {
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    color: '#666',
  },
  disabledOuter: {
    borderColor: '#666',
  },
  disabledInner: {
    backgroundColor: '#666',
  },
});

export default RadioButton;