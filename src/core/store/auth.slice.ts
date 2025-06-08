import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/core/store/store';

interface UserInfo {
   email?: string;
   name?: string;
   picture?: string;
}

interface AuthState {
   isAuthenticated: boolean;
   user: UserInfo | null;
   token: string | null;
}

const initialState: AuthState = {
   isAuthenticated: false,
   user: null,
   token: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      loginSuccess: (
         state,
         action: PayloadAction<{ user: UserInfo; token: string }>,
      ) => {
         state.isAuthenticated = true;
         state.user = action.payload.user;
         state.token = action.payload.token;
      },
      logout: (state) => {
         state.isAuthenticated = false;
         state.user = null;
         state.token = null;
      },
   },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
   state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
