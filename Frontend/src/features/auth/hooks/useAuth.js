import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

import axios from 'axios'

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
             axios.defaults.withCredentials = true;
            const data = await login({ email, password })
            setUser(data.user)
        } catch (err) {
           console.log(err);
           
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
             axios.defaults.withCredentials = true;
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {
           console.log(err);
           
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
             axios.defaults.withCredentials = true;
            const data = await logout()
            setUser(null)
        } catch (err) {
           console.log(err);
           
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                axios.defaults.withCredentials = true;
                const data = await getMe()
                setUser(data.user)
            } catch (err) { console.log(err);
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}