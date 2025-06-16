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
                    <label class="block font-medium mb-2">Title</label>
                    <input v-model="form.title" type="text" placeholder="Title" class="input mb-2 w-full border rounded p-1" />
                    <label class="block font-medium mb-2">Price</label>
                    <input v-model.number="form.price" type="number" placeholder="Price" class="input mb-2 w-full border rounded p-1" />
                    <label class="block font-medium mb-2">Description</label>
                    <input v-model="form.description" type="text" placeholder="Description" class="input mb-2 w-full border rounded p-1" />
                    <label class="block font-medium mb-2">Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        @change="handleFileChange"
                        ref="fileInput"
                        class="hidden"
                        />
                         <button
                        type="button"
                        @click="fileInput?.click()"
                        class="px-4 py-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        :disabled="product.uploadLoading"
                        >
                            {{ product.uploadLoading ? 'Uploading...' : 'Choose Images' }}
                        </button>
                        <div v-if="form.images.length === 0" class="text-sm text-gray-500 italic mb-2">
                            No images. Add one using image uploader (in full version).
                        </div>

                        <ul class="mb-4 space-y-1">
                            <li
                            v-for="(img, i) in form.images"
                            :key="i"
                            class="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                            >
                                <span class="text-sm truncate">{{ extractFilename(img) }}</span>
                                <button
                                    type="button"
                                    @click="removeImage(i)"
                                    class="text-red-600 hover:underline text-sm cursor-pointer"
                                    >Delete</button>
                            </li>
                        </ul>

                    <div class="flex justify-end gap-4">
                        <button type="button" @click="close" class="cursor-pointer px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed" :disabled="product.loading || product.uploadLoading">Cancel</button>
                        <button type="submit" class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed" :disabled="product.loading || product.uploadLoading">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useProductStore } from '../../stores/product';

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
const product = useProductStore()
const emit = defineEmits(['close', 'save']);

const form = reactive({
    title: '',
    price: 0,
    description: '',
    images: [] as string[],
});

const uploadedImages = ref<{ name: string; url: string }[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
watch(
    () => props.product,
    (val) => {
        if (val) {
            form.title = val.title;
            form.price = val.price;
            form.description = val.description;
            form.images = [...val.images];

            uploadedImages.value = val.images.map((url) => ({
                url,
                name: extractFilename(url),
            }))
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

function extractFilename(url: string) {
    return url.split('/').pop() || 'unknown';
}

function removeImage(index: number) {
    form.images.splice(index, 1);
}

const handleFileChange = async (e: Event) => {
    const files = (e.target as HTMLInputElement).files
    if (!files || files.length === 0) return

    for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)

        const url = await product.uploadImage(formData)
        if (url) {
            uploadedImages.value.push({
                name: file.name,
                url
            })
        }
    }

  form.images = uploadedImages.value.map(i => i.url)
}
</script>
