import { RootState } from '@/core/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OutputResult {
   [key: string]: string | number | boolean | null | undefined;
}

export interface OutputMeta {
   timestamp: number;
   name: string;
   duration: number;
   query: string;
   result: OutputResult[];
}

interface OutputState {
   queries: OutputMeta[];
   activeOutputTimestamp: number | null;
}

const MAX_QUERIES = 6;

const initialState: OutputState = {
   queries: [],
   activeOutputTimestamp: null,
};

const outputSlice = createSlice({
   name: 'output',
   initialState,
   reducers: {
      addQuery: (
         state,
         action: PayloadAction<{
            timestamp: number;
            duration: number;
            query: string;
            result: OutputResult[];
         }>,
      ) => {
         const { timestamp, duration, query, result } = action.payload;
         if (state.queries.length > MAX_QUERIES) {
            state.queries.shift();
         }
         state.queries.push({
            timestamp,
            duration,
            query,
            result,
            name: 'Result Check',
         });
         state.activeOutputTimestamp = timestamp;
      },
      removeQuery: (state, action: PayloadAction<number>) => {
         const timestamp = action.payload;
         const index = state.queries.findIndex(
            (output) => output.timestamp === timestamp,
         );
         if (index !== -1) {
            state.queries.splice(index, 1);
         }

         if (state.activeOutputTimestamp === timestamp) {
            state.activeOutputTimestamp = null;
         }
      },
      setActiveOutputTimestamp: (
         state,
         action: PayloadAction<number | null>,
      ) => {
         state.activeOutputTimestamp = action.payload;
      },
   },
});

export const selectOutputQueries = (state: RootState) => state.output.queries;
export const selectActiveOutputTimestamp = (state: RootState) =>
   state.output.activeOutputTimestamp;

export const { addQuery, removeQuery, setActiveOutputTimestamp } =
   outputSlice.actions;

export default outputSlice.reducer;
