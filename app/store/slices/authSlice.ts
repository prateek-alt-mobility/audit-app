import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../services/api";

interface User {
  email: string;
  phone_no: string | null;
  status: string;
  admin_id: number;
  password_change_required: boolean;
  approved_date: string | null;
  contact_person: string | null;
  created_date: string;
  last_login: string | null;
  modified_date: string;
  org_name: string | null;
  username: string;
  designation: string | null;
  adminRoleMaps: Array<{
    id: number;
    role_id: number;
    admin_id: number;
    created_date: string;
    modified_date: string;
    role: {
      role_name: string;
      created_date: string;
      modified_date: string;
      id: number;
      roleModuleMaps: Array<any>;
    };
  }>;
  accessToken: string;
  refreshToken: string;
  accessType: number;
  roles: Array<string>;
  redisToken: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      return null;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/login/audit', { email, password });
      const userData = response.data.data;

      // Store user data and tokens in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('auth_token', userData.accessToken);
      await AsyncStorage.setItem('refresh_token', userData.refreshToken);
      return userData;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || "Login failed");
      } else if (error.request) {
        throw new Error("No response from server");
      } else {
        throw new Error(error.message || "Login failed");
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('refresh_token');
      return null;
    } catch (error) {
      throw new Error("Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;