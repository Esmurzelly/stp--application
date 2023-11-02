import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://95.163.237.80/api'
});

instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config
});

export default instance;