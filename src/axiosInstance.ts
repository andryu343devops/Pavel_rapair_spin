import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // Укажите ваш API URL
});

// Добавляем интерсептор для автоматического добавления токена
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Получаем токен из Local Storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовок Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Обработка ошибок запроса
  }
);

export default axiosInstance;
