// import { RootState } from '@/core/store/store';
// import { getItem } from '@/utils/useLocalStorage';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface QueryMeta {
//    timestamp: number;
//    query: string;
//    duration: number;
// }

// interface DBState {
//    queryHistory: QueryMeta[];
//    tables: string[];
//    status: 'idle' | 'pending' | 'fulfilled' | 'error';
// }

// const initialState: DBState = {
//    queryHistory: (getItem('queryHistory') as QueryMeta[]) || [],
//    tables: [],
//    status: 'idle',
// };

// const dbSlice = createSlice({
//    name: 'db',
//    initialState,
//    reducers: {
//       setTables: (state, action: PayloadAction<string[]>) => {
//          console.log('Setting tables:', action.payload);
//          state.tables = action.payload;
//       },
//       addQuery: (state, action: PayloadAction<QueryMeta>) => {
//          state.queryHistory.push(action.payload);
//          if (state.queryHistory.length > 20) {
//             state.queryHistory.shift();
//          }
//       },
//    },
// });

// export const { setTables, addQuery } = dbSlice.actions;

// export const selectQueryHistory = (state: RootState) => state.db.queryHistory;

// export default dbSlice.reducer;
