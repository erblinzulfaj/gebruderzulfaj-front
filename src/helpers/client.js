import axios from "axios";

// Create an axios instance
const instance = axios.create({
  baseURL: "https://gebruderzulfaj-d1f80ddccd10.herokuapp.com", // Your backend URL
  headers: { "Content-Type": "application/json" },
});

let retryQueue = [];

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 Unauthorized response by retrying the request
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const token = localStorage.getItem("token");

      if (token) {
        // Retry the request if token is found after a reload
        error.config.headers["Authorization"] = `Bearer ${token}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
// // Add a request interceptor to add the token to the headers
// instance.interceptors.request.use(
//   function (config) {
//     // Get the token from localStorage (or wherever you're storing it)
//     const token = localStorage.getItem("token");

//     // If the token exists, add it to the Authorization header
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   function (error) {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

// // Optionally, you can also handle response errors globally (if needed)
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("Response error:", error);
//     return Promise.reject(error);
//   }
// );

// export default instance;
