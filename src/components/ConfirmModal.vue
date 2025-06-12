<template>
    <Teleport to="body">
        <div v-if="show" class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
                <p class="mb-4">{{ message }}</p>
                <div class="flex justify-center gap-4">
                    <button @click="$emit('cancel')" class="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                    <button @click="$emit('confirm')" class="px-4 py-2 bg-red-600 text-white rounded">{{ confirmText }}</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
defineProps<{
    show: boolean;
    message?: string;
    confirmText?: string;
}>();

defineEmits(['confirm', 'cancel']);
</script>
