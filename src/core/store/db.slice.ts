import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DBState {
   tables: string[];
}

const initialState: DBState = {
   tables: [],
};

export const dbSlice = createSlice({
   name: 'db',
   initialState,
   reducers: {
      setTables: (state, action: PayloadAction<string[]>) => {
         console.log('Setting tables:', action.payload);
         state.tables = action.payload;
      },
   },
});

export const { setTables } = dbSlice.actions;

export default dbSlice.reducer;
