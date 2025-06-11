import axios from "axios";
import environment from "../config/environment";
import { useAuthStore } from "../stores/auth";

const headers = {
    'Content-Type': 'application/json',
};

const instance = axios.create({
    baseURL: environment.API_URL,
    headers,
    timeout: 60 * 1000,
});

instance.interceptors.request.use(
    (request) => {
        const auth = useAuthStore();
        if (auth.token) {
            request.headers.Authorization = `Bearer ${auth.token}`;
        }
        return request;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default instance;