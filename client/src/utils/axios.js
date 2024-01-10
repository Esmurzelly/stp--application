import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://besafeapp.ru/api'
    // baseURL: 'http://localhost:3001/api'
});

instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config
});

export default instance;