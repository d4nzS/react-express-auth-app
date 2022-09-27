import api from './http';

const isAutoLogout = async () => {
  const response = await api.get('/users');

  const user = response.data.find(user => user.id === localStorage.getItem('token'));

  return !user || user.isBlocked;
};

export default isAutoLogout;
