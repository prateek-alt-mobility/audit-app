import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { handleLogout } from '../utils/navigation';

interface LogoutButtonProps {
  style?: object;
  textStyle?: object;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ style, textStyle }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={handleLogout}
    >
      <Text style={[styles.text, textStyle]}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LogoutButton; 