import { defineStore } from 'pinia';
import api from '../lib/axios';

export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
}

interface State {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

export const useCategoryStore = defineStore('category', {
    state: (): State => ({
        categories: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchCategories() {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get('/categories');
                this.categories = res.data;
            } catch (err: any) {
                this.error = err.message || 'Failed to load categories';
            } finally {
                this.loading = false;
            }
        }
    }
});
