import { defineStore } from "pinia";
import api from '../lib/axios';

interface AuthState {
    token: string;
    refreshToken: string;
    name: string;
    role: string;
    avatar: string;
    loading: boolean;
}

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    avatar: string;
    role?: string;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('token') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
        name: localStorage.getItem('name') || '',
        role: localStorage.getItem('role') || '',
        avatar: localStorage.getItem('avatar') || '',
        loading: false,
    }),
    actions: {
        async login(email: string, password: string) {
            try {
                const res = await api.post(`/auth/login`,{
                    email,
                    password,
                });
    
                this.token = res.data.access_token;
                this.refreshToken = res.data.refresh_token;
    
                localStorage.setItem('token', this.token);
                localStorage.setItem('refreshToken', this.refreshToken);
    
                const profile = await api.get('/auth/profile');
                this.name = profile.data.name;
                this.role = profile.data.role;
                this.avatar = profile.data.avatar;

                localStorage.setItem('name', this.name);
                localStorage.setItem('role', this.role);
                localStorage.setItem('avatar', this.avatar);
            } catch (error) {
                console.error('Login failed', error);
                throw error;
            }
        },
        async register(payload: RegisterPayload) {
            this.loading = true
            try {
                const res = await api.post(`/users`, payload);
                return res.data
            } catch (error: any) {
                throw new Error(error.response?.data?.message || 'Registration failed');
            } finally {
                this.loading = false;
            }
        },
        logout() {
            this.token = '';
            this.refreshToken = '';
            this.name = '';
            this.role = '';
            this.avatar = '';
            localStorage.clear();
        },
        initFromStorage() {
            this.token = localStorage.getItem('token') || '';
            this.refreshToken = localStorage.getItem('refreshToken') || '';
            this.name = localStorage.getItem('name') || '';
            this.role = localStorage.getItem('role') || '';
            this.avatar = localStorage.getItem('avatar') || '';
        }
    }
})