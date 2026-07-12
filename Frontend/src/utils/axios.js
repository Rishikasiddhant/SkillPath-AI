import axios from 'axios'

const api = axios.create({
  // Sirf domain do, /api mat lagao
  baseURL: "https://skillpath-ai-t86k.onrender.com/api", 
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})
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

export default api