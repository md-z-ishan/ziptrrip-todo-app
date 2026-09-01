import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Pre-configured Axios instance for Ziptrrip Todo REST API requests
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor to format errors into clean, readable JSON objects
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const formattedError = {
      message: error.response?.data?.message || 'Network connection failed. Please check backend server.',
      status: error.response?.status || 500,
    };
    return Promise.reject(formattedError);
  }
);

export default apiClient;
