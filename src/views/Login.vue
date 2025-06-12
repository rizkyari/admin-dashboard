<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h1 class="text-2xl font-bold mb-6 text-center">
                Admin Login
            </h1>

            <form @submit.prevent="handleLogin">
                <div class="my-2">
                    <label class="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        v-model="email"
                        required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div class="my-2">
                    <label class="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        v-model="password"
                        required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-5">Login</button>
                <p v-if="error" class="text-red-600 text-sm text-center mt-2">{{ error }}</p>
            </form>
        </div>
    </div>
</template>

<script setup>
import {useLogin} from '../composables/useLogin'

const { email, password, error, handleLogin } = useLogin();
</script>