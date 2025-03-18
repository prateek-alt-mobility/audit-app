import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

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

// Create a slice for auth state that will be updated by RTK Query
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    checkAuthStatus: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Handle login mutation
      .addMatcher(api.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = payload;
        state.error = null;
      })
      .addMatcher(api.endpoints.login.matchRejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || "Login failed";
      });
    // Handle logout mutation
    // .addMatcher(
    //   api.endpoints.logout.matchFulfilled,
    //   (state) => {
    //     state.user = null;
    //     state.isAuthenticated = false;
    //     state.error = null;
    //   }
    // );
  },
});

// Export a thunk to check auth status on app startup
export const checkAuthStatus = () => async (dispatch: any) => {
  try {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      dispatch(authSlice.actions.checkAuthStatus(user));
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
  }
};

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
