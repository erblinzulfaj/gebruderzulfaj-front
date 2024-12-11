<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from "@/stores/store.js";

const products = ref([]);
const removedProductIds = ref(new Set(JSON.parse(localStorage.getItem('removedProductIds') || '[]')));

const saveRemovedProductIds = () => {
  localStorage.setItem('removedProductIds', JSON.stringify(Array.from(removedProductIds.value)));
};

onMounted(async () => {
  try {
    const productStore = useProductStore();
    const allProducts = await productStore.getAllLessQuantity();
    console.log(allProducts)
    products.value = allProducts.filter(product => !removedProductIds.value.has(product.id));
  } catch (error) {
    console.error('Error fetching products with less quantity:', error);
  }
});

const removeProduct = (productId) => {
  removedProductIds.value.add(productId);
  saveRemovedProductIds();
  products.value = products.value.filter(product => product.id !== productId);
};
</script>

<template>
  <div class="products-page">
    <h1 style="color: green">{{$t('low_quantity_products')}}</h1>
    <div v-if="products.length > 0" class="product-details">
      <table class="product-table">
        <thead>
        <tr>
          <th>{{ $t('id') }}</th>
          <th>{{ $t('type') }}</th>
          <th>{{ $t('origin') }}</th>
          <th>{{ $t('original_name') }}</th>
          <th>{{ $t('code') }}</th>
          <th>{{ $t('common_name') }}</th>
          <th>{{ $t('quantity') }}</th>
          <th>{{ $t('actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.origin }}</td>
          <td>{{ product.originalName }}</td>
          <td>{{ product.code }}</td>
          <td>{{ product.commonName }}</td>
          <td>
            {{ product.quantity }}
            <span v-if="product.quantityType === 'METRA'">{{ $t('meters') }}</span>
            <span v-else-if="product.quantityType === 'COPA'">{{ $t('pieces') }}</span>
          </td>
          <td>
            <button @click="removeProduct(product.id)" class="btn btn-danger">X</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p style="color: red">{{$t('no_product_with_low_quantity')}}}</p>
    </div>
  </div>
</template>

<style scoped>
.products-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-details {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.product-table th {
  background-color: #f2f2f2;
}
</style>
