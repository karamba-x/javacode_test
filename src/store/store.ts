import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "../services/index";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  userReducer,
  [api.reducerPath]: api.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];