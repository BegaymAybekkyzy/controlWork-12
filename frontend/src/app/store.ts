import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import type { InternalAxiosRequestConfig } from "axios";
import { AxiosHeaders } from "axios";
import axiosAPI from "../axiosAPI.ts";
import {userReducer} from "../features/Users/usersSlice.ts";
import {groupsReducer} from "../features/Groups/groupsSlice.ts";

const userConfig = {
  key: "store: users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  users: persistReducer(userConfig, userReducer),
  groups: groupsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const persistor = persistStore(store);

axiosAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().users.user?.token;
  if (!token) return config;

  const headers = config.headers as AxiosHeaders;
  headers.set("Authorization", "Bearer " + token);
  return config;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
