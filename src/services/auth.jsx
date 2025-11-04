// src/services/auth.js
const API_BASE = "http://localhost:5000";

export const loginApi = async (email, password) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data; // expect { token: "...", user: { ... } } or similar
};

export const signupApi = async (payload) => {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data; // expect { token: "...", user: { ... } } or similar
};

export const saveToken = (token, ttlMinutes = 10) => {
  const expiresAt = Date.now() + ttlMinutes * 60 * 1000;
  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiry", String(expiresAt));
};

export const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
};

export const getToken = () => localStorage.getItem("token");

export const isTokenValid = () => {
  const t = localStorage.getItem("token");
  const exp = Number(localStorage.getItem("tokenExpiry") || 0);
  return t && Date.now() < exp;
};

// optional helper to attach auth header
export const authHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
