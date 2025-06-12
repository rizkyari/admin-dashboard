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
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex justify-end mt-6 gap-2 my-3">
                            <button @click="emit('delete', product.id)" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer">
                                Delete
                            </button>
                            <button @click="emit('edit', product)" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                                Edit
                            </button>
                        </div>
                        <button @click="close" class="cursor-pointer text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                    </div>
                    <div class="mb-2">
                        <h2 class="text-xl font-semibold">{{ product.title }}</h2>
                    </div>
                    <img
                        :src="product.images[0]"
                        alt="Product image"
                        class="w-full h-64 rounded mb-4"
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
        id: number;
        title: string;
        price: number;
        description: string;
        images: string[];
        category?: { name: string };
    };
    show: boolean;
    loading: boolean;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'delete', id: number): void;
    (e: 'edit', product: any): void;
}>()

function close() {
    emit('close');
}
</script>

<style scoped>
</style>
