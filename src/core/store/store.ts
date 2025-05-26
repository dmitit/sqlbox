import { dbSlice } from '@/core/store/db.slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
   reducer: {
      db: dbSlice.reducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
