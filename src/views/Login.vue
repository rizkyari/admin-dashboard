<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h1 class="text-2xl font-bold mb-6 text-center">
                Login
            </h1>

            <form @submit.prevent="handleLogin">
                <div class="my-2">
                    <label class="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        v-model="email"
                        required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div class="my-2">
                    <label class="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        v-model="password"
                        required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" class="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-5">
                    {{ loading ? 'Please wait...' : 'Login' }}
                </button>
                <p v-if="error" class="text-red-600 text-sm text-center mt-2">{{ error }}</p>
                <p class="text-sm text-center mt-6">
                    Don't have an account?
                    <RouterLink to="/register" class="text-blue-600 hover:underline">Register here</RouterLink>
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import {useLogin} from '../composables/useLogin'
import { RouterLink } from 'vue-router';

const { email, password, error, loading, handleLogin } = useLogin();
</script>