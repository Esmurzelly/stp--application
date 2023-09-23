import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { checkIsAuth, getMe } from './redux/features/authSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        {isAuth ? 
          <Route path="/" element={<Home />} />
          :
          <Route path="/" element={<Login />} />
        }
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
      </Routes>
      <ToastContainer position='bottom-right' />
    </Layout>
  );
}

export default App;