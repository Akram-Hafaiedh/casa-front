import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/User";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
interface AuthenticatedUser {
    email: string;
    roles: string[]
}
interface AuthContextType {
    isAuthenticated: boolean;
    user: AuthenticatedUser | null;
    currentUser: User | null;
    loading: boolean;
    login: ({ token }: { token: string }) => void;
    logout: ({ token }: { token: string }) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AuthenticatedUser | null>(null); //not the full user
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');
                if (token && storedUser) {
                    setIsAuthenticated(true);
                    setUser(JSON.parse(storedUser));

                    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
                    const response = await axios.get(`${apiUrl}/users/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response && response.data.status.code === 200) {
                        setCurrentUser(response.data.data.user);
                    } else {
                        toast.error('Session expired or user data is invalid. Please log in again.');
                        logout({ token });
                        setIsAuthenticated(false);
                        setUser(null);
                        setCurrentUser(null);
                        navigate('/');
                    }
                } else {
                    setCurrentUser(null);
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('Error accessing localStorage or fetching user data:', error);
                setIsAuthenticated(false);
                setUser(null);
                setCurrentUser(null);
                toast.error('An error occurred while checking authentication status.');
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async ({ token }: { token: string }) => {
        setIsAuthenticated(true);
        localStorage.setItem('token', token);
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
        try {
            // const response = await axios.get('/users/me');
            const response = await axios.get(`${apiUrl}/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response && response.data.status.code === 200) {
                const fullUser: User = response.data.data.user;
                setCurrentUser(fullUser);
                const user : AuthenticatedUser = {
                    email: response.data.data.user.email,
                    roles: response.data.data.user.roles.map((role:{ name : string}) => role.name)
                };
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                setCurrentUser(fullUser);
            }

        } catch (error) {
            console.log('Error fetching user', error);
            logout({ token });
        }
    }
    const logout = async ({ token }: { token: string }) => {
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

        setLoading(true);
        try{
            await axios.get(`${apiUrl}/auth/logout`, {
                headers: { Authorization: `Bearer ${token}` }
            }).catch(() => {}); 
        } catch (error) {
            console.log('Error fetching user', error);
        } finally {
            setIsAuthenticated(false);
            setUser(null);
            setCurrentUser(null);
            localStorage.removeItem('token'); // Remove token from local storage
            localStorage.removeItem('user'); // Remove user from local storage
            setLoading(false);
            navigate('/')
        }

    }

    if (loading)  return <Loader isLoading={loading} />;

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, currentUser, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthContext };