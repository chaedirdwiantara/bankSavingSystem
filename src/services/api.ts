import axios from 'axios';

// Base URL for API
// For Android emulator: use 10.0.2.2 to reach host machine
// For real device: use your computer's IP address (e.g., 192.168.x.x)
// For production: use deployed backend URL
const API_BASE_URL = __DEV__
    ? 'http://10.0.2.2:3000/api' // Development (Android emulator)
    : 'https://banksavingsystem-api-production.up.railway.app/api'; // Production (Railway)

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response.data, // Return only data part
    (error) => {
        // Handle error responses
        if (error.response) {
            // Server responded with error status
            const errorMessage = error.response.data?.error || error.response.data?.message || 'An error occurred';
            return Promise.reject(new Error(errorMessage));
        } else if (error.request) {
            // Request made but no response
            return Promise.reject(new Error('Network error. Please check your connection.'));
        } else {
            // Something else happened
            return Promise.reject(error);
        }
    }
);

export default apiClient;
