import axios from 'axios';

const PRIMARY_API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const FALLBACK_API_URL = 'http://localhost:5001/api';

/**
 * Pre-configured Axios instance with intelligent port fallback
 */
const apiClient = axios.create({
  baseURL: PRIMARY_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Interceptor to auto-fallback to port 5001 if port 5000 is occupied by macOS AirPlay Receiver
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Retry once on fallback URL if port 5000 fails to connect or returns non-API response
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED' || (error.response && error.response.status === 404)) {
      if (!originalRequest._retry && originalRequest.baseURL !== FALLBACK_API_URL) {
        originalRequest._retry = true;
        originalRequest.baseURL = FALLBACK_API_URL;
        originalRequest.url = originalRequest.url.replace(PRIMARY_API_URL, FALLBACK_API_URL);

        try {
          const fallbackResponse = await axios(originalRequest);
          return fallbackResponse.data;
        } catch (fallbackError) {
          const formattedFallback = {
            message: fallbackError.response?.data?.message || 'Network error: Express backend server is offline.',
            status: fallbackError.response?.status || 500,
          };
          return Promise.reject(formattedFallback);
        }
      }
    }

    const formattedError = {
      message: error.response?.data?.message || 'Network error: Unable to reach Express backend server.',
      status: error.response?.status || 500,
    };
    return Promise.reject(formattedError);
  }
);

export default apiClient;
