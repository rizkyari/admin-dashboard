<template>
    <aside class="w-64 bg-white shadow-lg hidden lg:block">
        <div class="p-6 text-xl font-bold border-b">Admin Panel</div>
        <nav class="p-4 space-y-2">
            <RouterLink to="/dashboard" class="block px-3 py-2 rounded hover:bg-gray-200" active-class="bg-gray-200 font-semibold">
                Dashboard
            </RouterLink>
            <RouterLink to="/products" class="block px-3 py-2 rounded hover:bg-gray-200" active-class="bg-gray-200 font-semibold">
                Products
            </RouterLink>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>