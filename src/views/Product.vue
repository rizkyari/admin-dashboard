<template>
    <DefaultLayout>
        <div class="p-6 sm:p-10">
            <ProductList/>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import ProductList from '../components/products/ProductList.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useProductStore } from '../stores/product';

const store = useProductStore();
onBeforeRouteLeave(() => {
    store.page = 1
})
</script>