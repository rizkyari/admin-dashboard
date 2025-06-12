<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">All Products</h2>

        <ProductFilter @apply-filters="handleFilterApply"/>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ProductSkeleton v-if="store.loading" v-for="n in 10" :key="n"/>
            <ProductCard v-else v-for="item in store.products" :key="item.id" :product="item" @click="openModal(item)"/>
        </div>


        <Pagination
            :currentPage="store.page"
            :isFirstPage="store.page === 1"
            @next="handleNext"
            @prev="handlePrev"
        />

        <ProductDetailModal
            v-if="selectedProduct"
            :product="selectedProduct"
            :show="showModal"
            :loading="store.detailLoad"
            @close="closeModal"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductStore } from '../../stores/product';
import type {Product} from '../../stores/product'
import ProductCard from './ProductCard.vue';
import ProductSkeleton from './ProductSkeleton.vue';
import Pagination from './Pagination.vue';
import ProductFilter from './ProductFilter.vue';
import ProductDetailModal from './ProductDetailModal.vue';

const store = useProductStore();
const selectedProduct = ref<Product | null>(null);
const showModal = ref(false);

onMounted(() => {
    store.fetchProducts();
});

function handleNext() {
    store.nextPage();
}

function handlePrev() {
    store.prevPage();
}

function handleFilterApply(filters: Record<string, any>) {
    store.setFilters(filters);
    store.resetPage();
    store.fetchProducts();
}

function openModal(product: Product) {
  selectedProduct.value = product;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
</script>