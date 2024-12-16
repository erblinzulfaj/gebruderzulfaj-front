import { defineStore } from "pinia";
import client from "@/helpers/client.js";

export const useProductStore = defineStore("product", () => {
  const getAllLessQuantity = async () => {
    try {
      const response = await client.get(`/api-product/less-quantity`);
      return response.data;
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  };

  const getDiscountHistory = async () => {
    try {
      const response = await client.get(`/api-product/discount-history`);
      return response.data;
    } catch (error) {
      console.error("Error getting discount history:", error);
      throw error;
    }
  };

  const getProductByCode = async (code) => {
    try {
      const response = await client.get(`/api-product/code/${code}`);
      return response.data;
    } catch (error) {
      console.error("Error getting product by code:", error);
      throw error;
    }
  };

  const getProductByOriginalName = async (name) => {
    try {
      const response = await client.get(`/api-product/original-name/${name}`);
      return response.data;
    } catch (error) {
      console.error("Error getting product by original name:", error);
      throw error;
    }
  };

  const getProductByCommonName = async (name) => {
    try {
      const response = await client.get(`/api-product/common-name/${name}`);
      return response.data;
    } catch (error) {
      console.error("Error getting product by common name:", error);
      throw error;
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await client.get(`/api-product/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error getting product by ID:", error);
      throw error;
    }
  };

  const getIncrementHistory = async () => {
    try {
      const response = await client.get(`/api-product/increment-history`);
      return response.data;
    } catch (error) {
      console.error("Error getting increment history:", error);
      throw error;
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await client.get(`/api-product`);
      return response.data;
    } catch (error) {
      console.error("Error getting all products:", error);
      throw error;
    }
  };

  const incrementQuantity = async (productId, quantityToAdd) => {
    try {
      const response = await client.put(
        `/api-product/increment/${productId}`,
        quantityToAdd,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        `Quantity incremented successfully for product with ID ${productId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error incrementing quantity for product with ID ${productId}:`,
        error
      );
      throw error;
    }
  };

  const decrementQuantity = async (productId, quantityToSubtract) => {
    try {
      const response = await client.put(
        `/api-product/decrement/${productId}`,
        quantityToSubtract,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        `Quantity decremented successfully for product with ID ${productId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error decrementing quantity for product with ID ${productId}:`,
        error
      );
      throw error;
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await client.post(`/api-product`, newProduct);
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await client.put(`/api-product/${id}`, updatedProduct);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await client.delete(`/api-product/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  return {
    getAllProducts,
    incrementQuantity,
    decrementQuantity,
    getAllLessQuantity,
    getDiscountHistory,
    getIncrementHistory,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCode,
    getProductByOriginalName,
    getProductByCommonName,
  };
});
