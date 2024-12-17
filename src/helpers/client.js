import axios from "axios";
import { useAuthStore } from "@/stores/auth"; // Adjust the path to your auth store

const client = axios.create({
  baseURL: "https://gebruderzulfaj-d1f80ddccd10.herokuapp.com", // Use env variable
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor to attach the token dynamically
client.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore(); // Access the Pinia auth store
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
