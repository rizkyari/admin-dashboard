import { defineStore } from "pinia";
import api from '../lib/axios';

interface Category {
    id: number;
    name: string;
    image: string;
    slug: string;
}

interface Product {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

interface State {
    products: Product[];
    loading: boolean;
    error: string | null;
    page: number;
    limit: number;
}

export const useProductStore = defineStore("product", {
    state: (): State => ({
        products: [] as Product[],
        loading: false,
        error: null as string | null,
        page: 1,
        limit: 10,
    }),
    actions: {
        async fetchProducts() {
            this.loading = true;
            this.error = null;

            try {
                const offset = (this.page - 1) * this.limit;
                const res = await api.get(`/products?offset=${offset}&limit=${this.limit}`);
                this.products = res.data;
            } catch (err: any) {
                this.error = err.message || "Failed to load products"
            } finally {
                this.loading = false;
            }
        },
        nextPage() {
            this.page++;
            this.fetchProducts();
        },
        prevPage() {
            if(this.page > 1){
                this.page--;
                this.fetchProducts();
            }
        },
    },
})