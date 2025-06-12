<template>
    <Teleport to="body">
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            @click.self="close"
        >
            <div class="bg-white w-full max-w-2xl mx-4 sm:mx-auto rounded-lg p-6 overflow-y-auto max-h-[90vh]">
                <template v-if="loading">
                    <Spinner />
                </template>
                <template v-else>
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold">{{ product.title }}</h2>
                        <button @click="close" class="cursor-pointer text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                    </div>

                    <img
                        :src="product.images[0]"
                        alt="Product image"
                        class="w-full h-64 object-cover rounded mb-4"
                    />

                    <p class="text-gray-700 mb-2"><strong>Price:</strong> ${{ product.price }}</p>
                    <p class="text-gray-700 mb-2"><strong>Category:</strong> {{ product.category?.name }}</p>
                    <p class="text-gray-700"><strong>Description:</strong> {{ product.description }}</p>
                </template>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import Spinner from '../Spinner.vue';

defineProps<{
    product: {
        title: string;
        price: number;
        description: string;
        images: string[];
        category?: { name: string };
    };
    show: boolean;
    loading: boolean;
}>();

const emit = defineEmits(['close']);

function close() {
    emit('close');
}
</script>

<style scoped>
</style>
