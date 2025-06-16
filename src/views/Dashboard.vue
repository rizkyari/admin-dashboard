<template>
    <DefaultLayout>
        <div class="p-2 sm:p-6">
            <h1 class="text 2xl sm:text-4xl font-bold mb-4">
                Welcome back, {{ auth.name }}!
            </h1>
            <p class="text-gray-600 text-sm sm:text-base mb-5">
                This is your dashboard. From here you can manage your products and view insights.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div class="bg-white shadow rounded p-4">
                    <p class="text-sm text-gray-500 mb-2">Total Products</p>
                    <div v-if="productStore.loading">
                        <Spinner/>
                    </div>
                    <p v-else class="text-2xl font-bold">{{ productStore.dashboardStats.total }}</p>
                </div>
                <div class="bg-white shadow rounded p-4">
                    <p class="text-sm text-gray-500 mb-2">Most Expensive products</p>
                    <div v-if="productStore.loading">
                        <Spinner/>
                    </div>
                    <p v-else class="text-lg font-semibold">
                        Rp.{{ productStore.dashboardStats.maxPrice.toLocaleString() }},-
                    </p>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import Spinner from '../components/Spinner.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { useAuthStore } from '../stores/auth';
import { useProductStore } from '../stores/product';
import { onMounted } from 'vue';

const productStore = useProductStore();
const auth = useAuthStore();

onMounted(() => {
    productStore.fetchDashboardStats();
});
</script>