import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, getMe } from './redux/features/authSlice';
import LoaderComponent from './components/LoaderComponent';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './pages/Login'));
const Registration = lazy(() => import(/* webpackChunkName: "Registration" */ './pages/Registration'));
const AdminPanel = lazy(() => import(/* webpackChunkName: "AdminPanel" */ './pages/AdminPanel'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Routes>
      {isAuth ? (
        <Route
          path="/"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <Home />
            </Suspense>
          }
        />
      ) : (
        <Route
          path="/"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <Login />
            </Suspense>
          }
        />
      )}
      <Route
        path="login"
        element={
          <Suspense fallback={<LoaderComponent />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense fallback={<LoaderComponent />}>
            <Registration />
          </Suspense>
        }
      />
      <Route
        path="admin-panel"
        element={
          <Suspense fallback={<LoaderComponent />}>
            <AdminPanel />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<LoaderComponent />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
