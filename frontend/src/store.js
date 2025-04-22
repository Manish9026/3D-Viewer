import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/auth/authSlice";
import {authReducer} from "./slices/authSlice";
import viewerReducer from "./slices/viewerSlice";
import { authApi } from "./services/authServices";
import { modelApi } from "./services/modelServices";

export const store = configureStore({
  reducer: {
     authReducer,
     [authApi.reducerPath]: authApi.reducer,
    viewer: viewerReducer,
    [modelApi.reducerPath]: modelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware,modelApi.middleware]),
  devTools: import.meta.VITE_PRODUCTION_STATUS !== 'production' || false,
});