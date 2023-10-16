import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { checkIsAuth, getMe } from './redux/features/authSlice';

import NotFound from './pages/NotFound';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
      <Routes>
        {isAuth 
          ? <Route path="/" element={<Home />} />
          : <Route path="/" element={<Login />} />
        }
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

  );
}

export default App;