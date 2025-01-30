import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  accessToken: localStorage.getItem('accessToken') || null,
};


const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      state.user = null;
      state.accessToken = null;
    }
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;