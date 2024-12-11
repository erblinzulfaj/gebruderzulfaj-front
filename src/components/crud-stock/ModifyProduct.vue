<template>
  <div class="edit-product-page">
    <h2 style="color: green">{{ $t('edit_product') }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="type">{{ $t('type') }}</label>
        <select v-model="product.type" id="type" required>
          <option v-for="option in typeOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="origin">{{ $t('origin') }}</label>
        <input v-model="product.origin" type="text" id="origin" required />
      </div>
      <div class="form-group">
        <label for="originalName">{{ $t('original_name') }}</label>
        <input v-model="product.originalName" type="text" id="originalName" required />
      </div>
      <div class="form-group">
        <label for="code">{{ $t('code') }}</label>
        <input v-model="product.code" type="text" id="code" required />
      </div>
      <div class="form-group">
        <label for="commonName">{{ $t('common_name') }}</label>
        <input v-model="product.commonName" type="text" id="commonName" required />
      </div>
      <div class="form-group">
        <label for="quantity">{{ $t('quantity') }}</label>
        <input v-model="product.quantity" type="number" id="quantity" required />
      </div>
      <div class="form-group">
        <label for="type">{{$t('quantity_types')}}</label>
        <select v-model="product.quantityType" id="type" required>
          <option v-for="quantityType in quantityTypes" :key="quantityType" :value="quantityType">{{ quantityType }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">{{ $t('update') }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProductStore } from "@/stores/store.js";
import LanguageSelector from '@/components/layout/LanguageSelector.vue'; // Adjust the path as necessary
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const product = ref({
  id: null,
  type: '',
  origin: '',
  originalName: '',
  commonName: '',
  code: '',
  emri: '',
  quantity: null,
  localDateTime: ''
});


const quantityTypes = ['METRA', 'COPA'];
const typeOptions = ['RAM', 'KRAH', 'HEKER', 'LLAJSNE', 'ADAPTER', 'MEKANIZEM', 'SHTOJSA', 'TETJERA'];

const productStore = useProductStore();
const router = useRouter();
const route = useRoute();

const fetchProduct = async () => {
  const id = route.params.id;
  try {
    const data = await productStore.getProductById(id); // Fetch the product by ID
    product.value = data;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

onMounted(fetchProduct);

const submitForm = async () => {
  const id = route.params.id;
  try {
    await productStore.updateProduct(id, product.value); // Call the updateProduct method from the store
    console.log('Product updated successfully');
    router.go(-1); // Redirect back
  } catch (error) {
    console.error('Error updating product:', error);
  }
};
</script>

<style scoped>
.edit-product-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
