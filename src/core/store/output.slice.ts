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

const MAX_QUERIES = 6;

const initialState: OutputMeta[] = [];

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
         state.unshift({
            timestamp,
            duration,
            query,
            result,
            name: 'Result Check',
         });
         if (state.length > MAX_QUERIES) {
            state.pop();
         }
      },
      removeQuery: (state, action: PayloadAction<number>) => {
         const timestamp = action.payload;
         const index = state.findIndex(
            (output) => output.timestamp === timestamp,
         );
         if (index !== -1) {
            state.splice(index, 1);
         }
      },
   },
});

export const selectOutputQueries = (state: RootState) => state.output;

export const { addQuery, removeQuery } = outputSlice.actions;

export default outputSlice.reducer;
