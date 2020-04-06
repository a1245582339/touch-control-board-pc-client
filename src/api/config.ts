import axios from 'axios';
const http = axios.create({
    // baseURL: process.env.BASE_URL,
    baseURL: 'http://localhost:3005',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// request拦截器
http.interceptors.request.use(
    config => {
        config.url = `/api/v1/pc${config.url}`
        return config
    },
    error => error,
);

// response拦截器
http.interceptors.response.use(
    response => response.data,
    (error) => {
        throw error
    },
);


export default http;