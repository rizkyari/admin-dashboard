<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h1 class="text-2xl font-bold text-center mb-6">Register</h1>

            <form @submit.prevent="handleRegister">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input
                    v-model="form.password"
                    type="password"
                    required
                    class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700">Avatar URL</label>
                    <input
                    v-model="form.avatar"
                    type="text"
                    required
                    class="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

        <button
          type="submit"
          class="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
          :disabled="store.loading"
        >
          {{ store.loading ? 'Registering...' : 'Register' }}
        </button>

        <p class="text-sm text-center mt-6">
          Already have an account?
          <RouterLink to="/login" class="text-blue-600 hover:underline">Login here</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const store = useAuthStore();

const form = reactive({
    name: '',
    email: '',
    password: '',
    avatar: '',
    role: 'admin',
});

async function handleRegister() {
    const success = await store.register(form);
    if (success) {
        router.push('/login');
    }
}
</script>