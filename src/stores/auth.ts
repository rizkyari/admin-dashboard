import { defineStore } from "pinia";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import environment from "../config/environment";

interface AuthState {
    token: string;
    role: string;
    refreshToken: string;
}

interface DecodeJWT {
    role: string;
    exp: number;
    iat: number
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('token') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
        role: '',
    }),
    actions: {
        async login(email: string, password: string) {
            const res = await axios.post(`${environment.API_URL}`,{
                email,
                password,
            });

            const accessToken: string = res.data.access_token;
            const refreshToken: string = res.data.refresh_token;
            const decoded: DecodeJWT = jwtDecode(accessToken);

            this.token = accessToken;
            this.refreshToken = refreshToken;
            this.role = decoded.role;
            
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        logout() {
            this.token = '';
            this.refreshToken = '';
            this.role = '';
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        },
        initFromStorage() {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');
            if(token) {
                this.token = token;
                this.refreshToken = refreshToken || '';
                try {
                    const decoded: DecodeJWT = jwtDecode(token);
                    this.role = decoded.role;
                } catch (error) {
                    console.error('Invalid token:', error);
                    this.logout();
                }
            }
        }
    }
})