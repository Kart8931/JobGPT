import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

// Helper to extract data safely
const handleResponse = (response) => response?.data;

export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', { username, email, password });
        return handleResponse(response);
    } catch (err) {
        console.error("Register Error:", err.response?.data?.message || err.message);
        throw err; 
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", { email, password });
        return handleResponse(response);
    } catch (err) {
        console.error("Login Error:", err.response?.data?.message || err.message);
        throw err; 
    }
}

export async function logout() {
    try {
        const response = await api.get("/api/auth/logout");
        return handleResponse(response);
    } catch (err) {
        console.error("Logout Error:", err.message);
        throw err;
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");
        // Return only the data if request is successful
        return response?.data || null;
    } catch (err) {
        // 401 means user is simply not logged in. This is NOT a "crashable" error.
        if (err.response?.status === 401) {
            return null; 
        }
        console.error("Session Check Error:", err.message);
        return null; // Return null instead of throwing to prevent app crash
    }
}