<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
            <label class="block font-medium mb-2">Titles</label>
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
            v-model="form.image"
            type="text"
            required
            class="w-full border px-3 py-2 rounded"
            placeholder="Input the image url here..."
            />
        </div>
        
        <label>Product Image</label>
        <input
        type="file"
        accept="image/*"
        multiple
        @change="handleFileChange"
        />

        <div class="flex justify-end">
            <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500"
            >
                Save Product
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useCategoryStore } from '../../stores/category';
import { useProductStore } from '../../stores/product';

const category = useCategoryStore();
const productStore = useProductStore();
const productData = ref({
    title: '',
    price: 0,
    description: '',
    images: [] as string[],
})
const emit = defineEmits<{
    (e: 'submit', data: any): void;
}>();

const form = reactive({
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    image: ''
});

function handleSubmit() {
    emit('submit', {
        title: form.title,
        price: form.price,
        description: form.description,
        categoryId: form.categoryId,
        images: [form.image],
    });
}

const handleFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  const uploadedUrls: string[] = []

  for (const file of Array.from(files)) {
    const formData = new FormData()
    formData.append('file', file)

    const url = await productStore.uploadImage(formData)
    if (url) {
      uploadedUrls.push(url)
    }
  }

  productData.value.images = uploadedUrls
}

onMounted(() => {
    category.fetchCategories();
});
</script>
