import { defineStore } from "pinia";
import client from "@/helpers/client.js";
import { ref, computed, watch } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || null);

  // Watch for token changes and update localStorage
  watch(token, (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  });

  const logIn = async (user) => {
    try {
      const response = await client.post("/api/auth/authenticate", user);
      if (response.data && response.data.token) {
        token.value = response.data.token;
      }
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  function logOut() {
    if (isLoggedIn.value) {
      console.log("Logging out...");
      token.value = null; // This will trigger localStorage removal via watch
      window.location.href = "/login";
    }
  }

  const isLoggedIn = computed(() => !!token.value);

  return { logIn, logOut, isLoggedIn, token };
});
