<template>
  <div class="add-product-page">
    <h2>{{$t('add_product')}}</h2>
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
      <button type="submit" class="btn btn-primary">{{$t('add')}}</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from "@/stores/store.js";

const product = ref({
  id: null,
  type: '',
  origin: '',
  originalName: '',
  code: '',
  commonName: '',
  quantity: null,
  quantityType: '',
  localDateTime: ''
});

const quantityTypes = ['METRA', 'COPA'];
const typeOptions = ['RAM', 'KRAH', 'HEKER','LLAJSNE', 'ADAPTER', 'MEKANIZEM', 'SHTOJSA','TETJERA']; // Replace with your actual type options

const productStore = useProductStore(); // Initialize the store
const router = useRouter(); // Initialize the router

const submitForm = async () => {
  try {
    await productStore.addProduct(product.value); // Call the addProduct method from the store
    console.log('Product added successfully');
    router.go(-1); // Redirect back
  } catch (error) {
    console.error('Error adding product:', error);
  }
};
</script>

<style scoped>
.add-product-page {
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
