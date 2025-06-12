<template>
    <div class="p-6">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold mb-4">All Products</h2>
            <button @click="openCreateModal" class="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-500">+ Add</button>
        </div>
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
            @delete="handleDelete"
            @edit="handleEdit"
        />
        <ProductEditModal
            v-if="showEditModal"
            :show="showEditModal"
            :product="editFormData"
            @close="showEditModal = false"
            @save="handleSaveEdit"
        />
        <ProductCreateModal
            v-if="showCreateModal"
            :show="showCreateModal"
            @close="showCreateModal = false"
            @submit="handleSubmit"
        />
        <ConfirmModal
            v-if="showConfirmDelete"
            :show="showConfirmDelete"
            message="Are you sure you want to delete this product?"
            confirmText="Delete"
            @confirm="confirmDelete"
            @cancel="showConfirmDelete = false"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductStore } from '../../stores/product';
import type {Product} from '../../stores/product'
import type { ProductPayload } from '../../stores/product';
import ProductCard from './ProductCard.vue';
import ProductSkeleton from './ProductSkeleton.vue';
import Pagination from './Pagination.vue';
import ProductFilter from './ProductFilter.vue';
import ProductDetailModal from './ProductDetailModal.vue';
import ConfirmModal from '../ConfirmModal.vue';
import ProductEditModal from './ProductEditModal.vue';
import ProductCreateModal from './ProductCreateModal.vue';

const store = useProductStore();
const selectedProduct = ref<Product | null>(null);
const showModal = ref(false);
const showConfirmDelete = ref(false);
const productToDelete = ref<number | null>(null);
const showEditModal = ref(false);
const editFormData = ref<any>(null);
const showCreateModal = ref(false);

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

function openCreateModal() {
    showCreateModal.value = true;
}

function closeModal() {
    showModal.value = false;
}

function handleDelete(id: number) {
    productToDelete.value = id;
    showConfirmDelete.value = true;
}

async function confirmDelete() {
    if (productToDelete.value !== null) {
        await store.deleteProduct(productToDelete.value);
        closeModal();
        showConfirmDelete.value = false;
        store.fetchProducts();
    }
}

function handleEdit(product: Product) {
    editFormData.value = { ...product };
    selectedProduct.value = product;
    showEditModal.value = true;
}

async function handleSaveEdit(updated: any) {
    if(!selectedProduct.value) return

    await store.updateProduct(selectedProduct.value.id, updated);
    closeModal();
    showEditModal.value = false;
    store.fetchProducts();
}

async function handleSubmit(payload: ProductPayload) {
  const success = await store.createProduct(payload);
  if (success) {
    showCreateModal.value = false
  }
}
</script>