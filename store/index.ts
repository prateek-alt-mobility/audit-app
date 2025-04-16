import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { batteryApi } from "./services/batteryApi";
import authReducer from "./slices/authSlice";
import batteryReducer from "./slices/batterySlice";
import counterReducer from "./slices/counterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    battery: batteryReducer,
    [api.reducerPath]: api.reducer,
    [batteryApi.reducerPath]: batteryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(batteryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;