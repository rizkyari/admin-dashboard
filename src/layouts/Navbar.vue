<template>
    <header class="bg-white shadow p-4 flex justify-between items-center">
        <button class="lg:hidden text-gray-700 mr-2" @click="toggleMobileMenu">
             &#x2630;
        </button>
        <h2 class="text-xl font-semibold">Dashboard</h2>
        <div class="hidden lg:flex items-center gap-3">
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
    <transition name="slide">
        <div
            v-if="showMobileMenu"
            class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            @click.self="toggleMobileMenu"
        >
            <aside class="bg-white w-64 h-full shadow-lg p-6 z-50">
                <div class="mb-4">
                    <img :src="auth.avatar" class="w-10 h-10 rounded-full mb-2" />
                    <p class="font-medium">{{ auth.name }}</p>
                </div>
                <nav class="flex flex-col gap-2">
                    <RouterLink
                        to="/dashboard"
                        class="text-gray-700 hover:text-blue-600"
                        @click="toggleMobileMenu"
                    >Dashboard</RouterLink>
                    <RouterLink
                        to="/products"
                        class="text-gray-700 hover:text-blue-600"
                        @click="toggleMobileMenu"
                    >Products</RouterLink>
                    <button
                        @click="handleLogout"
                        class="text-left text-red-600 hover:underline mt-4"
                    >Logout</button>
                </nav>
            </aside>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const showMobileMenu = ref(false)

const handleLogout = () => {
    auth.logout();
    router.push('/login');
}

function toggleMobileMenu() {
    showMobileMenu.value = !showMobileMenu.value
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}
.slide-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}
.slide-enter-to {
    transform: translateX(0%);
    opacity: 1;
}
.slide-leave-from {
    transform: translateX(0%);
    opacity: 1;
}
.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>