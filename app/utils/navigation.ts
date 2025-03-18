import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { store } from '../store';
import { clearLocalStorage } from '../store/services/api';
import { logout } from '../store/slices/authSlice';

/**
 * Handles logout by clearing local storage and redirecting to login page
 */
export const handleLogout = async () => {
  // Clear local storage
  await clearLocalStorage();
  
  // Update Redux state
  store.dispatch(logout());
  
  // Redirect to login page
  router.replace('/login');
};

/**
 * Checks if user is authenticated and navigates to the appropriate screen
 * If user is logged in, goes to home page, otherwise to login page
 */
export const checkAuthAndNavigate = async () => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    const userData = await AsyncStorage.getItem('user');
    
    if (token && userData) {
      // User is authenticated, go to home page
      router.replace('/');
    } else {
      // User is not authenticated, go to login page
      router.replace('/login');
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    // On error, default to login page
    router.replace('/login');
  }
}; 