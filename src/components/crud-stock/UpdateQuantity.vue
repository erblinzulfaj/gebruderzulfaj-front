<template>
  <div>
    <div class="search-product-page">
      <h2 style="color: green;">{{ $t("search_title") }}</h2>

      <div class="search-buttons">
        <button
          @click="setSearchType('code')"
          :class="{
            'btn-active': searchType === 'code',
            'btn-secondary': searchType !== 'code',
          }"
          class="btn"
        >
          {{ $t("search_by_code") }}
        </button>
        <button
          @click="setSearchType('original-name')"
          :class="{
            'btn-active': searchType === 'original-name',
            'btn-secondary': searchType !== 'original-name',
          }"
          class="btn"
        >
          {{ $t("search_by_original_name") }}
        </button>
        <button
          @click="setSearchType('common-name')"
          :class="{
            'btn-active': searchType === 'common-name',
            'btn-secondary': searchType !== 'common-name',
          }"
          class="btn"
        >
          {{ $t("search_by_common_name") }}
        </button>
      </div>

      <div v-if="searchType" class="search-bar">
        <input
          v-model="searchValue"
          @keyup.enter="searchProduct"
          type="text"
          :placeholder="$t('enter_product') + ' ' + searchType"
        />
        <button @click="searchProduct" class="btn btn-primary">
          {{ $t("search") }}
        </button>
      </div>

      <!-- Hide product details when searchType is set -->
      <div v-if="searchType && product" class="product-details">
        <label>{{ $t("original_name") }}: {{ product.originalName }}</label>
        <label>{{ $t("common_name") }}: {{ product.commonName }}</label>
        <label>{{ $t("product_code") }}: {{ product.code }}</label>
        <label
          >{{ $t("current_quantity") }}:
          <span v-if="product.quantityType === 'METRA'"
            >{{ product.quantity }} {{ $t("meters") }}</span
          >
          <span v-else-if="product.quantityType === 'COPA'"
            >{{ product.quantity }} {{ $t("pieces") }}</span
          >
        </label>

        <div class="update-quantity">
          <input
            type="number"
            v-model="newQuantity"
            :placeholder="$t('enter_quantity')"
            class="form-control d-inline-block"
            style="width: auto; margin-right: 10px;"
          />
          <button
            @click="incrementQuantity(product.id, newQuantity)"
            class="btn btn-success me-2"
          >
            +
          </button>
          <button
            @click="decrementQuantity(product.id, newQuantity)"
            class="btn btn-danger"
          >
            -
          </button>
        </div>
      </div>

      <div v-else-if="searchType && !product">
        <p style="color: red;">{{ $t("enter_search_value") }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/store.js";
import Swal from "sweetalert2";

const searchType = ref("");
const searchValue = ref("");
const product = ref(null);
const newQuantity = ref("");
const productStore = useProductStore();

const setSearchType = (type) => {
  searchType.value = type;
  searchValue.value = "";
  product.value = null; // Clear product details when search type changes
};

const searchProduct = async () => {
  let foundProduct;
  switch (searchType.value) {
    case "code":
      foundProduct = await productStore.getProductByCode(searchValue.value);
      break;
    case "original-name":
      foundProduct = await productStore.getProductByOriginalName(
        searchValue.value
      );
      break;
    case "common-name":
      foundProduct = await productStore.getProductByCommonName(
        searchValue.value
      );
      break;
    default:
      foundProduct = null;
  }

  if (foundProduct) {
    product.value = foundProduct;
    newQuantity.value = "";
  } else {
    product.value = null;
    Swal.fire("Error", "Product not found", "error");
  }
};

const incrementQuantity = async (productId, quantityToAdd) => {
  try {
    const quantity = parseFloat(quantityToAdd);
    if (!isNaN(quantity) && quantity > 0) {
      await productStore.incrementQuantity(productId, quantity);
      Swal.fire({
        title: "Success",
        text: `Added ${quantity} to the product quantity`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire("Error", "Invalid quantity input", "error");
    }
  } catch (error) {
    Swal.fire("Error", "Error updating quantity", "error");
    console.error("Error updating quantity:", error);
  }
};

const decrementQuantity = async (productId, quantityToSubtract) => {
  try {
    const quantity = parseFloat(quantityToSubtract);
    if (!isNaN(quantity) && quantity > 0) {
      await productStore.decrementQuantity(productId, quantity);
      Swal.fire({
        title: "Success",
        text: `Subtracted ${quantity} from the product quantity`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire("Error", "Invalid quantity input", "error");
    }
  } catch (error) {
    Swal.fire("Error", "Error updating quantity", "error");
    console.error("Error updating quantity:", error);
  }
};
</script>

<style scoped>
/* General Styles */
.search-product-page {
  max-width: 800px;
  min-width: 300px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Search Bar */
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-bar input {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.search-bar button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}

/* Search Buttons */
.search-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns by default */
  gap: 10px;
  margin-bottom: 20px;
}

.search-buttons button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-buttons .btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.search-buttons .btn-secondary:hover {
  background-color: #5a6268;
}

.search-buttons .btn-active {
  background-color: #007bff;
  color: #fff;
}

.search-buttons .btn-active:hover {
  background-color: #0056b3;
}

/* Product Details */
.product-details {
  background: #ffffff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-details label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}

.product-details span {
  font-weight: normal;
  color: #555;
}

/* Update Quantity */
.update-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.update-quantity input {
  width: 80px;
  padding: 10px;
  text-align: center;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.update-quantity button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.update-quantity .btn-success {
  background-color: #28a745;
  color: #fff;
}

.update-quantity .btn-success:hover {
  background-color: #218838;
}

.update-quantity .btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.update-quantity .btn-danger:hover {
  background-color: #c82333;
}

/* Error Message */
.error-message {
  color: red;
  font-size: 14px;
}

/* Responsive Design */
@media screen and (max-width: 1024px) {
  .search-product-page {
    padding: 15px;
  }
}

@media screen and (max-width: 768px) {
  .search-bar {
    flex-direction: column; /* Stack input and button */
    gap: 5px;
  }

  .search-buttons {
    grid-template-columns: 1fr; /* Single column */
  }

  .product-details {
    padding: 15px;
  }

  .update-quantity {
    flex-direction: column; /* Stack input and buttons */
    gap: 5px;
  }

  .update-quantity input {
    width: 100%; /* Full width */
  }
}

@media screen and (max-width: 480px) {
  .search-bar input {
    font-size: 14px; /* Adjust for smaller screens */
  }

  .search-bar button {
    font-size: 14px;
    padding: 8px 15px;
  }

  .product-details label {
    font-size: 14px;
  }

  .update-quantity button {
    font-size: 14px;
    padding: 8px 15px;
  }

  .error-message {
    font-size: 12px;
  }
}
</style>
