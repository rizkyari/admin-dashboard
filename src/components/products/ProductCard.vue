<template>
    <div @click="$emit('click')" class="border rounded-lg p-4 shadow hover:shadow-xl transition cursor-pointer">
        <img :src="product.images[0]" alt="Product Image" class="w-full h-40 object-cover rounded"/>
        <h3 class="mt-2 font-bold text-lg">{{ product.title }}</h3>
        <p class="text-gray-600 text-sm mt-1 truncate">{{ product.description }}</p>
        <p class="text-green-600 font-semibold mt-2">Rp {{ product.price.toLocaleString() }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    product: {
        id: number;
        title: string;
        description: string;
        price: number;
        images: string[];
    }
}>();
</script>