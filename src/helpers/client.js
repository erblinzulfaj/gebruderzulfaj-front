import axios from "axios";
import { useAuthStore } from "@/stores/auth"; // Importo Auth Store për qasjen e token-it

const instance = axios.create({
  baseURL: "https://gebruderzulfaj-d1f80ddccd10.herokuapp.com",
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    try {
      const authStore = useAuthStore(); // Merr token-in nga auth store
      const token = authStore.token || localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn(
          "No token found. Request may fail due to missing authentication."
        );
      }
    } catch (error) {
      console.error("Error in request interceptor:", error);
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      console.error("Response Error:", error.response);

      if (error.response.status === 401) {
        // Token është i pavlefshëm ose mungon, bëj logout
        const authStore = useAuthStore();
        authStore.logOut(); // Hiq token dhe ridrejtoje përdoruesin në login
        console.warn("Unauthorized access. Redirecting to login...");
      }
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
