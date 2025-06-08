import dbSlice from '@/core/store/db.slice';
import outputSlice from '@/core/store/output.slice';
import authSlice from '@/core/store/auth.slice'; // Import the auth slice reducer
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

export type RootState = {
   db: ReturnType<typeof dbSlice>;
   output: ReturnType<typeof outputSlice>;
   auth: ReturnType<typeof authSlice>;
};

const persistConfig: PersistConfig<RootState> = {
   key: 'root',
   version: 1,
   storage: storage,
   stateReconciler: autoMergeLevel2,
   whitelist: ['db', 'output', 'auth'],
};

const rootReducer = combineReducers({
   db: dbSlice,
   output: outputSlice,
   auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   devTools: import.meta.env.DEV,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
         },
      }),
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
