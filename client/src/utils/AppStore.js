import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import CartSliceReducer from "./CartSlice";
import UserSliceReducer from "./UserSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  cart: CartSliceReducer,
  user: UserSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const AppStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(AppStore);

export { AppStore, persistor };
