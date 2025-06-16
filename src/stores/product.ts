import { defineStore } from "pinia";
import qs from 'qs';
import api from '../lib/axios';

interface Category {
    id: number;
    name: string;
    image: string;
    slug: string;
}

export interface Product {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

export interface ProductPayload {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
}

interface Filters {
    title?: string;
    price?: number | null;
    price_min?: number | null;
    price_max?: number | null;
    categorySlug?: string;
}

interface DashboardStats {
  total: number;
  maxPrice: number;
}

interface State {
    products: Product[];
    loading: boolean;
    detailLoad: boolean;
    uploadLoading: boolean,
    errorUpload: string | null,
    error: string | null;
    page: number;
    limit: number;
    filters: Filters;
    dashboardStats: DashboardStats;
}

export const useProductStore = defineStore("product", {
    state: (): State => ({
        products: [] as Product[],
        loading: false,
        detailLoad: false,
        error: null as string | null,
        errorUpload: null as string | null,
        page: 1,
        limit: 10,
        filters: {},
        uploadLoading: false,
        dashboardStats: {
            total: 0,
            maxPrice: 0,
        },
    }),
    actions: {
        async fetchProducts() {
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
        async fetchDashboardStats() {
            this.loading = true;
            this.error = null;

            try {
                const res = await api.get('/products');
                const products: Product[] = res.data;

                this.dashboardStats.total = products.length;
                this.dashboardStats.maxPrice = Math.max(...products.map(p => p.price));
            } catch (error: any) {
                this.errorUpload = error.message || "Failed to get product data";
                return null;
            } finally {
                this.loading = false
            }
        },
        async uploadImage(data: FormData): Promise<string | null> {
            this.uploadLoading = true;
            this.errorUpload = null;

            try {
                const res = await api.post(`/files/upload`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                return res.data.location; // URL gambar hasil upload
            } catch (error: any) {
                this.errorUpload = error.message || "Failed to upload image";
                return null;
            } finally {
                this.uploadLoading = false;
            }
        },
        async fetchProductById(id: number){
            this.detailLoad = true;
            this.error = null;

            try {
                const res = await api.get(`/products/${id}`);
                return res.data;
            } catch (err: any) {
                this.error = err.message || "Failed to fetch product details";
                return null
            } finally {
                this.detailLoad = false;
            }
        },
        async updateProduct(id: number, data: Partial<Product>) {
            this.loading = true;
            this.error = null;
            try {
                await api.put(`/products/${id}`, data);
            } catch (err: any) {
                this.error = err.message || 'Failed to update product'
            } finally {
                this.loading = false;
            }
        },
        async deleteProduct(id: number) {
            this.loading = true;
            try {
                await api.delete(`/products/${id}`);
            } catch (err : any) {
                this.error = err.message || "Failed to delete product"
            } finally {
                this.loading = false;
            }
        },
        async createProduct(payload: ProductPayload) {
            this.loading = true;
            this.error = null;

            try {
                await api.post(`/products`, payload);
                return true;
            } catch (err: any) {
                this.error =  err.message || 'Failed to create product';
                return false;               
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