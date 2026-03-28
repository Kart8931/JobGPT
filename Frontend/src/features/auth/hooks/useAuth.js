import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    // Destructuring context properly
    const { user, setUser, loading, setLoading } = context;

    // Helper to handle user state safely
    const handleUserData = (data) => {
        if (data && data.user) {
            setUser(data.user);
        } else {
            setUser(null);
        }
    };

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            handleUserData(data);
        } catch (err) {
            console.error("Login failed:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            handleUserData(data);
        } catch (err) {
            console.error("Registration failed:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getAndSetUser = async () => {
            // Loading start only if we don't have a user yet
            if (!user) setLoading(true); 
            try {
                const data = await getMe();
                // FIX: Check if data exists before accessing .user
                if (data) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) { 
                console.log("Session expired or not logged in");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { user, loading, handleRegister, handleLogin, handleLogout };
};