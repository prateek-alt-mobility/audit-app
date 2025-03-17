import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = "https://dev-api.alt-mobility.com";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login/audit',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: async (response: any) => {
        const userData = response.data;
        
        // Store user data and tokens in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await AsyncStorage.setItem('auth_token', userData.accessToken);
        await AsyncStorage.setItem('refresh_token', userData.refreshToken);
        
        return userData;
      },
    }),
    // Add more endpoints here as needed
  }),
});

// Function to clear local storage without API call
export const clearLocalStorage = async () => {
  await AsyncStorage.removeItem('user');
  await AsyncStorage.removeItem('auth_token');
  await AsyncStorage.removeItem('refresh_token');
};

// Export hooks for usage in components
export const {
  useLoginMutation,
} = api;