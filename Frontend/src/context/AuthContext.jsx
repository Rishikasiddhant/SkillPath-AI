import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Token check karo
        const token = localStorage.getItem('token')
        if (!token) {
          setIsLoading(false)
          return
        }
        
        const { data } = await api.get('/auth/me')
        setUser(data.user)
      } catch {
        localStorage.removeItem('token') // Agar error aaye toh token hata do
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])c

  const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const data = response.data;

  if (data.token) {
    console.log("Token received:", data.token);
    
    // YEH LINE ZAROORI HAI:
    localStorage.setItem('token', data.token); 
    
    setUser(data.user); // Agar aap user set kar rahe hain
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