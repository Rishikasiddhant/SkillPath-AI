import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
    setIsLoading(true); // Shuru mein loading true karein
    try {
        // Line 14-18 hata dein (token wala check zaroorat nahi hai)
        const { data } = await api.get('/auth/me'); // Ye direct request bhejega aur cookie apne aap jayegi
        setUser(data.user);
    } catch (err) {
        setUser(null);
    } finally {
        setIsLoading(false); // End mein loading false
    }
};
    checkAuth()
  }, []);

  const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user); // Agar ye line fail hui toh error aa sakta hai
      // Yahan navigate('/dashboard') add karna na bhoolein
    }
  } catch (error) {
    console.error("Login failed:", error); // Check karein kya error aa raha hai
  }
};
  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    
    // Yahan bhi token save karo
    localStorage.setItem('token', data.token)
    
    setUser(data.user)
    return data.user
  }

  const logout = async () => {
    await api.post('/auth/logout')
    localStorage.removeItem('token') // Logout par token hatao
    setUser(null)
  }

  // ... baaki ka code same rahega
  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }))
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F0F1A' }}>
         <p style={{ color: '#9090B0' }}>Loading SkillPath AI...</p>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthContext