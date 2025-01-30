import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "../services/index";
import userReducer from "./slices/userSlice";
import uiReducer from "./slices/uiSlice";

const rootReducer = combineReducers({
  uiReducer,
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