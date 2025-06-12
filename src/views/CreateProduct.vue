<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import type { ProductPayload } from '../stores/product';
import ProductForm from '../components/products/ProductForm.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';

const router = useRouter();
const store = useProductStore();

async function handleSubmit(payload: ProductPayload) {
  const success = await store.createProduct(payload);
  if (success) {
    router.push('/products');
  }
}
</script>

<template>
    <DefaultLayout>
        <div class="p-6">
            <h2 class="text-2xl font-bold mb-4">Create New Product</h2>
            <ProductForm @submit="handleSubmit"/>
        </div>
    </DefaultLayout>
</template>