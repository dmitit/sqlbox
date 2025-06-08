// import { RootState } from '@/core/store/store';
// import { getItem } from '@/utils/useLocalStorage';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/core/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableColumnMeta {
   cid: number;
   default_value: string | number | null;
   name: string;
   nullable: boolean;
   pk: boolean;
   type: string;
}

export interface TableMeta {
   name: string;
   columns: TableColumnMeta[];
}

interface DBState {
   tables: TableMeta[];
}

const initialState: DBState = {
   tables: [],
};

const dbSlice = createSlice({
   name: 'db',
   initialState,
   reducers: {
      setTables: (state, action: PayloadAction<TableMeta[]>) => {
         state.tables = action.payload;
      },
   },
});

export const selectTables = (state: RootState) => state.db.tables;

export const { setTables } = dbSlice.actions;

export default dbSlice.reducer;
