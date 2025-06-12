<template>
    <header class="bg-white shadow p-4 flex justify-between items-center">
        <button class="lg:hidden text-gray-700 mr-2">
             &#x2630;
        </button>
        <h2 class="text-xl font-semibold">Dashboard</h2>
        <div class="flex items-center gap-3">
            <img :src="auth.avatar" class="w-8 h-8 rounded-full"/>
            <span class="font-medium">{{ auth.name }}</span>
            <button
                @click="handleLogout"
                class="ml-4 text-sm text-red-600 hover:underline cursor-pointer"
            >
                Logout
            </button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    auth.logout();
    router.push('/login');
}
</script>