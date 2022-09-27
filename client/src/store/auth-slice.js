import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('token'),
    errorMessage: null
  },
  reducers: {
    authenticate(state, action) {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
    },

    updateErrorMessage(state, action) {
      state.errorMessage = action.payload.errorMessage;
    },

    logout(state) {
      localStorage.removeItem('token');
      state.user = null;
      state.isLoggedIn = false;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;