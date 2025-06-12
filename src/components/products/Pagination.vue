<template>
    <div class="flex justify-center items-center gap-4 mt-6">
        <button 
            class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
            :disabled="isFirstPage"
            @click="$emit('prev')"
        >
            Prev
        </button>
        <span class="text-sm font-medium">Page {{ currentPage }}</span>
        <button
            class="px-4 py-2 bg-gray-200 rounded cursor-pointer"
            @click="$emit('next')"
        >
            Next
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
    currentPage: number
    isFirstPage: boolean
}>()

const emit = defineEmits(['next', 'prev'])
</script>