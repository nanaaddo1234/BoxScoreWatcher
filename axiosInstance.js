// src/axiosInstance.js
import axios from 'axios';

// Replace this with your computer's local IP address and Flask port
const BASE_URL = 'https://www.boxscorewatcher.com/';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 30 seconds timeout
});

// Optional: Add a request interceptor
axiosInstance.interceptors.request.use(config => {
    // You can add headers or other configurations here
    return config;
}, error => {
    return Promise.reject(error);
});

// Optional: Add a response interceptor
axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;