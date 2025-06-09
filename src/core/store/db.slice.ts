// import { RootState } from '@/core/store/store';
// import { getItem } from '@/utils/useLocalStorage';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/core/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TableCell = number | string | boolean | null;
export type TableRow = Record<string, TableCell>;

export interface ForeignKeyMeta {
   constraint_name: string;
   column_names: string[];
   referenced_table: string;
   referenced_column_names: string[];
}

export interface TableColumnMeta {
   cid: number;
   default_value: string | number | null;
   name: string;
   nullable: boolean;
   pk: boolean;
   foreignKey?: ForeignKeyMeta;
   type: string;
}

export interface TableMeta {
   name: string;
   columns: TableColumnMeta[];
   rows: TableRow[];
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
