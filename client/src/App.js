import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage/> : <Navigate to="/auth"/>}/>
        <Route path="/auth" element={isLoggedIn ? <Navigate to="/"/> : <AuthPage/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
