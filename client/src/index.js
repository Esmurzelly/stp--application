import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import './i18n';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        <ToastContainer position='bottom-right' />
      </Provider>
    </Router>
  </React.StrictMode>
);
