<template>
    <Teleport to="body">
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            @click.self="close"
        >
            <div class="bg-white w-full max-w-2xl mx-4 sm:mx-auto rounded-lg p-6">
                <h2 class="text-xl font-bold mb-4">Edit Product</h2>
                <form @submit.prevent="submit">
                    <input v-model="form.title" type="text" placeholder="Title" class="input mb-2 w-full" />
                    <input v-model.number="form.price" type="number" placeholder="Price" class="input mb-2 w-full" />
                    <input v-model="form.description" type="text" placeholder="Description" class="input mb-2 w-full" />
                    <input v-model="form.images[0]" type="text" placeholder="Image URL" class="input mb-4 w-full" />

                    <div class="flex justify-end gap-4">
                        <button type="button" @click="close" class="cursor-pointer px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-300">Cancel</button>
                        <button type="submit" class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

const props = defineProps<{
    show: boolean;
    product: {
        id: number;
        title: string;
        price: number;
        description: string;
        images: string[];
    };
}>();

const emit = defineEmits(['close', 'save']);

const form = reactive({
    title: '',
    price: 0,
    description: '',
    images: [''],
});

watch(
    () => props.product,
    (val) => {
        if (val) {
            form.title = val.title;
            form.price = val.price;
            form.description = val.description;
            form.images[0] = val.images?.[0] ?? '';
        }
    },
    { immediate: true }
);

function close() {
    emit('close');
}

function submit() {
    emit('save', { ...form });
}
</script>
