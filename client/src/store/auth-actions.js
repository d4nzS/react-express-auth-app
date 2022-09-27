import { authActions } from './auth-slice';
import api from './http';

export const authenticate = (isLogin, { name, email, password }) => {
  return async dispatch => {
    try {
      const response = isLogin
        ? await api.post('/login', { email, password })
        : await api.post('/registration', { name, email, password });

      localStorage.setItem('token', response.data.user.id);
      dispatch(authActions.authenticate({
        isLoggedIn: true
      }));
    } catch (err) {
      dispatch(authActions.updateErrorMessage({ errorMessage: err.response?.data?.message }));
    }
  }
};
