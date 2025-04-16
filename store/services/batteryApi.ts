import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BATTERY_API_URL = process.env.EXPO_PUBLIC_BATTERY_URL || "https://battery.alt-mobility.com";

// Define a service using the battery URL and expected endpoints
export const batteryApi = createApi({
  reducerPath: 'batteryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BATTERY_API_URL,
    prepareHeaders: async (headers) => {
      // Get token from storage
      const token = await AsyncStorage.getItem('auth_token');
      
      // If token exists, add to headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
});

// Export hooks for usage in other files
export const {
  // This will be populated when endpoints are added
} = batteryApi; 