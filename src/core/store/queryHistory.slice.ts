import { RootState } from '@/core/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QueryHistoryEntry {
   id: number;
   sql: string;
   timestamp: number;
}

interface QueryHistoryState {
   history: QueryHistoryEntry[];
}

const MAX_HISTORY = 50;

const initialState: QueryHistoryState = {
   history: [],
};

const queryHistorySlice = createSlice({
   name: 'queryHistory',
   initialState,
   reducers: {
      addQueryToHistory: (
         state,
         action: PayloadAction<{ sql: string; timestamp?: number }>,
      ) => {
         const entry: QueryHistoryEntry = {
            id: Date.now(),
            sql: action.payload.sql,
            timestamp: action.payload.timestamp ?? Date.now(),
         };
         state.history.push(entry);
         if (state.history.length > MAX_HISTORY) {
            state.history.shift();
         }
      },
      clearQueryHistory: (state) => {
         state.history = [];
      },
   },
});

export const selectQueryHistory = (state: RootState) =>
   state.queryHistory.history;

export const { addQueryToHistory, clearQueryHistory } =
   queryHistorySlice.actions;

export default queryHistorySlice.reducer;
