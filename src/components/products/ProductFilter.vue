<template>
    <div class="mb-4">
        <button
            @click="showFilters = !showFilters"
            class="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded mb-4"
        >
            {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
        </button>

        <transition name="fade-slide">
        <div v-if="showFilters" class="flex flex-wrap gap-2 justify-between">
            <input
                v-model="filters.title"
                type="text"
                placeholder="Search title"
                class="border px-3 py-2 rounded w-full sm:w-auto"
            />
            <input
                v-model.number="filters.price_min"
                type="number"
                placeholder="Min Price"
                class="border px-3 py-2 rounded w-full sm:w-auto"
            />
            <input
                v-model.number="filters.price_max"
                type="number"
                placeholder="Max Price"
                class="border px-3 py-2 rounded w-full sm:w-auto"
            />
            <select
                v-model="filters.categorySlug"
                class="border px-3 py-2 rounded w-full sm:w-auto"
            >
                <option value="">All Categories</option>
                <option
                    v-for="cat in category.categories"
                    :key="cat.id"
                    :value="cat.slug"
                >
                    {{ cat.name }}
                </option>
            </select>
            <button @click="applyFilters" class="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                Apply
            </button>
            <button @click="resetFilters" class="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400">
                Reset
            </button>
        </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useProductStore } from '../../stores/product';
import { useCategoryStore } from '../../stores/category';

const store = useProductStore();
const category = useCategoryStore();
const showFilters = ref(false);

const filters = reactive({
    title: '',
    price: null,
    price_min: null,
    price_max: null,
    categorySlug: ''
});

function applyFilters() {
    store.setFilters({...filters});
    store.fetchProducts();
}

function resetFilters() {
    Object.assign(filters, {
        title: '',
        price: null,
        price_min: null,
        price_max: null,
        categorySlug: '',
    });
    store.setFilters({});
    store.resetPage();
    store.fetchProducts();
}

onMounted(() => {
    category.fetchCategories();
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>