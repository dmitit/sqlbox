import dbSlice from '@/core/store/db.slice';
import outputSlice from '@/core/store/output.slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

export type RootState = {
   db: ReturnType<typeof dbSlice>;
   output: ReturnType<typeof outputSlice>;
};

const persistConfig: PersistConfig<RootState> = {
   key: 'root',
   version: 1,
   storage: storage,
   stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
   db: dbSlice,
   output: outputSlice,
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
