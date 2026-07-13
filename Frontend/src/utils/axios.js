import axios from 'axios'

const api = axios.create({
  baseURL: "https://skillpath-ai-t86k.onrender.com/api", 
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

// YE INTERCEPTOR ADD KARO (Token attach karne ke liye)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Agar token localStorage mein hai
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api;