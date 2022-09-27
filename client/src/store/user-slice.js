import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: []
  },
  reducers: {
    getUsers(state, action) {
      state.users = action.payload.users;
    },

    deleteUsers(state) {
      state.users = state.users.filter(user => !user.isChecked);
    },

    blockUsers(state, action) {
      action.payload.blockedUsers
        .forEach(blockedUser => state.users.find(user => blockedUser.id === user.id).isBlocked = true);
    },

    unblockUsers(state, action) {
      action.payload.unblockedUsers
        .forEach(unblockedUser => state.users.find(user => unblockedUser.id === user.id).isBlocked = false);
    },

    toggleUser(state, action) {
      const user = state.users.find(user => user.id === action.payload.id);

      user.isChecked = !user.isChecked;
    },

    toggleAllUsers(state, action) {
      state.users.forEach(user => user.isChecked = action.payload.checked);
    },

    removeAllUsers(state) {
      state.users.forEach(user => user.isChecked = false);
    }
  }
});

export const userActions = userSlice.actions;

export default userSlice;