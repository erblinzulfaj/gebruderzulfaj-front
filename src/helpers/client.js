import axios from "axios";

// Create an axios instance
const instance = axios.create({
  baseURL: "https://gebruderzulfaj-d1f80ddccd10.herokuapp.com", // Your backend URL
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor to add the token to the headers
instance.interceptors.request.use(
  function (config) {
    // Get the token from localStorage (or wherever you're storing it)
    const token = localStorage.getItem("token");

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Optionally, you can also handle response errors globally (if needed)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default instance;
