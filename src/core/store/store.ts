import { dbSlice } from '@/core/store/db.slice';
import { outputSlice } from '@/core/store/output.slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
   reducer: {
      db: dbSlice.reducer,
      output: outputSlice.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
