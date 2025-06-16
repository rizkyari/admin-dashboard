<template>
    <Teleport to="body">
        <div v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
            <div class="bg-white w-full max-w-2xl mx-4 sm:mx-auto rounded-lg p-6 overflow-y-auto max-h-[90vh]">
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div>
                        <label class="block font-medium mb-2">Title</label>
                        <input
                        v-model="form.title"
                        type="text"
                        required
                        class="w-full border px-3 py-2 rounded"
                        placeholder="Put title here..."
                        />
                    </div>

                    <div>
                        <label class="block font-medium mb-2">Price</label>
                        <input
                        v-model.number="form.price"
                        type="number"
                        required
                        class="w-full border px-3 py-2 rounded"
                        placeholder="Put the price here..."
                        />
                    </div>

                    <div>
                        <label class="block font-medium mb-2">Description</label>
                        <textarea
                        v-model="form.description"
                        required
                        class="w-full border px-3 py-2 rounded"
                        placeholder="Put the description here..."
                        ></textarea>
                    </div>

                    <div>
                        <label class="block font-medium mb-2">Category ID</label>
                        <select
                            v-model="form.categoryId"
                            class="border px-3 py-2 rounded w-full"
                        >
                            <option value=0 disabled>Choose category</option>
                            <option
                                v-for="cat in category.categories"
                                :key="cat.id"
                                :value="cat.id"
                            >
                                {{ cat.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="block font-medium mb-2">Image URL</label>
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
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        :disabled="product.uploadLoading"
                        >
                            {{ product.uploadLoading ? 'Uploading...' : 'Choose Images' }}
                        </button>
                        <p v-if="product.uploadLoading" class="text-blue-600 mt-1">Uploading image...</p>
                        <div v-if="uploadedImages.length > 0" class="space-y-1 mt-2">
                            <div
                            v-for="(img, i) in uploadedImages"
                            :key="i"
                            class="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                            >
                                <span class="text-sm truncate">{{ img.name }}</span>
                                <button
                                    type="button"
                                    @click="removeUploadedImage(i)"
                                    class="text-red-600 hover:underline cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-2">
                        <button
                        type="submit"
                        class="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        :disabled="product.loading || product.uploadLoading"
                        >
                            {{ product.loading ? 'Saving...' : 'Save'}}
                        </button>
                        <button @click="showConfirmCancel = true" class="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed" :disabled="product.loading || product.uploadLoading">Cancel</button>
                    </div>
                </form>
            </div>
            <ConfirmModal
            v-if="showConfirmSave"
            :show="showConfirmSave"
            message="Are you sure you want to create this product?"
            confirmText="Save"
            @confirm="emitSubmit"
            @cancel="showConfirmSave = false"
            />
            <ConfirmModal
            v-if="showConfirmCancel"
            :show="showConfirmCancel"
            message="Are you sure you want to cancel this product?"
            confirmText="Cancel"
            :is-use-cancel="false"
            @confirm="close"
            @cancel="showConfirmCancel = false"
            />
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref,reactive, onMounted } from 'vue';
import { useCategoryStore } from '../../stores/category';
import { useProductStore } from '../../stores/product';
import ConfirmModal from '../ConfirmModal.vue';

const category = useCategoryStore();
const product = useProductStore();
const showConfirmSave = ref(false);
const showConfirmCancel = ref(false);
const formError = ref('');

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', data: any): void;
}>();

defineProps<{
    show: boolean;
}>();

type UploadedImage = {
  name: string;
  url: string;
};
const uploadedImages = ref<UploadedImage[]>([])

const form = reactive({
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: [] as string[],
});

function emitSubmit() {
    emit('submit', {
        title: form.title,
        price: form.price,
        description: form.description,
        categoryId: form.categoryId,
        images: form.images,
    });

    showConfirmSave.value = false;
}

function close() {
    emit('close');
}

const fileInput = ref<HTMLInputElement | null>(null)
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

const removeUploadedImage = (index: number) => {
  uploadedImages.value.splice(index, 1)
  form.images = uploadedImages.value.map(i => i.url)
}

function handleSubmit() {
    if (
        !form.title ||
        !form.price ||
        !form.description ||
        !form.categoryId ||
        form.images.length === 0
  ) {
        formError.value = 'All of the form must be filled';
        showConfirmSave.value = false;
        return;
  }

    formError.value = '';
    showConfirmSave.value = true;
}

onMounted(() => {
    category.fetchCategories();
});
</script>