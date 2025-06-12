import { defineStore } from "pinia";
import qs from 'qs';
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

interface Filters {
    title?: string;
    price?: number | null;
    price_min?: number | null;
    price_max?: number | null;
    categorySlug?: string;
}

interface State {
    products: Product[];
    loading: boolean;
    error: string | null;
    page: number;
    limit: number;
    filters: Filters;
}

export const useProductStore = defineStore("product", {
    state: (): State => ({
        products: [] as Product[],
        loading: false,
        error: null as string | null,
        page: 1,
        limit: 10,
        filters: {},
    }),
    actions: {
        async fetchProducts(filters: Record<string, string | number> = {}) {
            this.loading = true;
            this.error = null;

            try {
                const offset = (this.page - 1) * this.limit;
                const query = qs.stringify({
                    offset,
                    limit: this.limit,
                    ...this.filters,
                });

                const res = await api.get(`/products?${query}`);
                this.products = res.data;
            } catch (err: any) {
                this.error = err.message || "Failed to load products"
            } finally {
                this.loading = false;
            }
        },
        setFilters(filters: Filters) {
            this.filters = filters;
            this.page = 1;
        },
        resetPage() {
            this.page = 1;
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