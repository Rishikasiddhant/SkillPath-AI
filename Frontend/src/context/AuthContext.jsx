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
    const res = await api.post('/auth/login', { email, password });
    setUser(res.data);
    return res.data; // <--- Yeh line add karni zaroori hai!
  } catch (err) {
    throw err; // Taaki error LoginPage mein catch ho sake
  }
};
  const register = async (name, email, password) => {
  try {
    const res = await api.post('/auth/register', { name, email, password });
    setUser(res.data); // User set karein
    window.location.href = '/dashboard'; // Redirect karein
  } catch (err) {
    console.error("Register Error:", err);
  }
};

  const logout = async () => {
  try {
    await api.post('/auth/logout');
    setUser(null); // User ko null karein
    window.location.href = '/login'; // Login page par bhej dein
  } catch (err) {
    console.error("Logout Error:", err);
  }
};

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
  );
};
export const useAuth = () => useContext(AuthContext)
export default AuthContext;