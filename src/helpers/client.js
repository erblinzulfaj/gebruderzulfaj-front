import axios from "axios";

// Create an axios instance
const instance = axios.create({
  baseURL: "https://gebruderzulfaj-d1f80ddccd10.herokuapp.com", // Backend URL
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor to include the token dynamically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token being sent:", token); // Debugging: log the token
    } else {
      console.warn("No token found, request sent without Authorization header");
    }

    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

// Optionally, add a response interceptor to handle errors globally
instance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    console.error("Response error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Consider logging the user out.");
      // Optionally handle token expiry here, like redirecting to login
    }
    return Promise.reject(error);
  }
);

export default instance;
