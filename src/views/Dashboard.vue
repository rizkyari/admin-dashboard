<template>
    <DefaultLayout>
        <div class="p-2 sm:p-6">
            <h1 class="text 2xl sm:text-4xl font-bold mb-4">
                Welcome back, {{ auth.name }}!
            </h1>
            <p class="text-gray-600 text-sm sm:text-base">
                This is your dashboard. From here you can manage your products and view insights.
            </p>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
</script>