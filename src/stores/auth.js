import { defineStore } from "pinia";
import client from "@/helpers/client.js";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || null);

  const logIn = async (user) => {
    try {
      const response = await client.post("/api/auth/authenticate", user);
      if (response.data) {
        localStorage.setItem("token", response.data.token);
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
      localStorage.removeItem("token");
      token.value = null;
      // Opsional: Ridrejto përdoruesin te faqja e login
      window.location.href = "/login";
    }
  }

  const isLoggedIn = computed(() => !!token.value);

  return { logIn, logOut, isLoggedIn, token };
});
