import fetchData from "./fetch-data";
import {  userActions } from './user-slice';
import api, { API_URL } from './http';
import { authActions } from "./auth-slice";
import isAutoLogout from "./auto-logout";

export const getUsers = () => {
  return async dispatch => {
    try {
      const response = await api.get('/users');

      dispatch(userActions.getUsers({ users: response.data.map(user => ({ ...user, isChecked: false })) }));

      if (await isAutoLogout()) {
        dispatch(authActions.logout());
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const deleteUsers = users => {
  return async dispatch => {
    try {
      if (await isAutoLogout()) {
        dispatch(authActions.logout());
        throw new Error("You don't have access");
      }

      await fetchData({
        url: API_URL + '/delete',
        method: 'DELETE',
        body: users
      });
      dispatch(userActions.deleteUsers());

      if (await isAutoLogout()) {
        dispatch(authActions.logout());
      }
    } catch (err) {
      alert(err.message);
    }
  }
};

export const blockUsers = users => {
  return async dispatch => {
    try {
      if (await isAutoLogout()) {
        dispatch(authActions.logout());
        throw new Error("You don't have access");
      }

      await api.put('/block', users);
      dispatch(userActions.blockUsers({ blockedUsers: users }));

      if (await isAutoLogout()) {
        dispatch(authActions.logout());
      }
    } catch (err) {
      alert(err.message);
    }
  }
};

export const unblockUsers = users => {
  return async dispatch => {
    try {
      if (await isAutoLogout()) {
        dispatch(authActions.logout());
        throw new Error("You don't have access");
      }

      await api.put('/unblock', users);

      dispatch(userActions.unblockUsers({ unblockedUsers: users }));
    } catch (err) {
      alert(err);
    }
  }
};