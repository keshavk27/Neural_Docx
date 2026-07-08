import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_DB_URL||"http://localhost:5000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});


// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response?.status === 401) {
            
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;