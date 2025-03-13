import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
const API_BASE_URL="https://dev-api.alt-mobility.com"

// Create axios instance with default config
const api = axios.create({
  baseURL:API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    // Get token from storage
    const token = await AsyncStorage.getItem('auth_token');
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // You could implement token refresh logic here
        // const refreshToken = await AsyncStorage.getItem('refresh_token');
        // const response = await axios.post('auth/refresh', { refreshToken });
        // await AsyncStorage.setItem('auth_token', response.data.token);
        
        // Return the original request with new token
        // return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        // You'll need to implement this based on your navigation setup
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;