import axios from "axios";

const axiosApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});


axiosApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        // Token hanya dikirim jika tersedia
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosApi;