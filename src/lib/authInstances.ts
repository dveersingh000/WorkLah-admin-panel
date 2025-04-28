import axios from 'axios'
import Cookies from 'js-cookie';


export const axiosInstance = axios.create({
     //baseURL: "http://localhost:3000/api",
     baseURL:"https://admin-panel-backend-imbt.onrender.com/api",
    //baseURL:"https://worklah.onrender.com/api",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('authToken'); // Retrieve token from cookies
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
