<template>
  <div class="products-page">
    <h1 style="color: green">{{ $t('selected_type') }}: {{ selectedItem }}</h1>
    <button @click="printPage" class="btn btn-primary mb-3">{{ $t('print_stock') }}</button>
<!--    <button @click="saveAsPDF" class="btn btn-primary mb-3" style="margin-left: 10px">{{ $t('save_as_pdf') }}</button>-->

    <div class="printable-content" v-if="selectedItem && filteredProducts.length">
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
          <th class="tdd">{{$t('change_quantity')}}</th>
          <th class="tdd">{{ $t('actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.origin }}</td>
          <td>{{ product.originalName }}</td>
          <td>{{ product.code }}</td>
          <td>{{ product.commonName }}</td>
          <td>
            <span v-if="product.quantityType === 'METRA'">{{ product.quantity }} {{ $t('meters') }}</span>
            <span v-else-if="product.quantityType === 'COPA'">{{ product.quantity }} {{ $t('pieces') }}</span>
          </td>
          <td class="tdd" style="width: 30%">
            <input type="number" v-model="product.newQuantity" :placeholder="$t('new_quantity')" class="form-control d-inline-block" style="width: auto; margin-right: 10px">
            <button @click="incrementQuantity(product.id, product.newQuantity)" class="btn btn-success me-2">+</button>
            <button @click="decrementQuantity(product.id, product.newQuantity)" class="btn btn-danger">-</button>
          </td>
          <td class="tdd" style="width: 20%">
            <button @click="editProduct(product.id)" class="btn btn-primary me-2">{{ $t('update') }}</button>
            <button @click="confirmDeleteProduct(product.id)" class="btn btn-danger">{{ $t('delete') }}</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p style="color: red">{{ selectedItem ? $t('there_are_no_products_of_the_type_you_selected') : $t('you_did_not_click_the_product_type') }}</p>
    </div>
  <hr/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/store.js";
import { useRouter } from 'vue-router';
import Swal from "sweetalert2";

const selectedItem = ref(localStorage.getItem('selectedItem'));
const filteredProducts = ref([]);
const productStore = useProductStore();
const router = useRouter();


onMounted(async () => {
  if (selectedItem.value) {
    try {
      const products = await productStore.getAllProducts();
      console.log(products)
      filteredProducts.value = products
          .filter(product => product.type === selectedItem.value)
          .map(product => ({
            ...product,
            newQuantity: null
          }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
});

const incrementQuantity = async (productId, newQuantity) => {
  try {
    const quantityToAdd = parseFloat(newQuantity);
    if (!isNaN(quantityToAdd) && quantityToAdd > 0) {
      await productStore.incrementQuantity(productId, quantityToAdd);
      console.log(`Quantity updated successfully for product with ID ${productId}`);
      window.location.reload();
    } else {
      console.error('Invalid quantity input');
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};

const decrementQuantity = async (productId, newQuantity) => {
  try {
    const quantityToSubtract = parseFloat(newQuantity);
    if (!isNaN(quantityToSubtract) && quantityToSubtract > 0) {
      await productStore.decrementQuantity(productId, quantityToSubtract);
      console.log(`Quantity updated successfully for product with ID ${productId}`);
      window.location.reload();
    } else {
      console.error('Invalid quantity input');
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};

const editProduct = (productId) => {
  router.push(`/update/${productId}`);
};

const confirmDeleteProduct = async (productId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    await deleteProduct(productId);
  }
};

const deleteProduct = async (productId) => {
  try {
    await productStore.deleteProduct(productId);
    console.log(`Product with ID ${productId} deleted successfully`);
    filteredProducts.value = filteredProducts.value.filter(product => product.id !== productId);
    Swal.fire(
        'Deleted!',
        'Your product has been deleted.',
        'success'
    );
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

const printPage = () => {
  // Use setTimeout to ensure content is fully rendered before printing
  setTimeout(() => {
    window.print();
  }, 500); // Adjust timeout as needed
};
</script>

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

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}



button:hover {
  background-color: #ddd;
}

@media print {
  /* Adjust styles for printing */
  @page {
    size: A4 portrait;
    margin: 1cm;
  }

  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }

  .products-page {
    max-width: 100%;
    margin: 0;
    padding: 0;
  }

  .btn {
    display: none;
  }

  .tdd {
    display: none !important;
  }
}
</style>
