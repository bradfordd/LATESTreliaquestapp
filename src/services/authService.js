import http from "./httpServices";
import { apiUrl } from "./config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/auth";

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("teacher");
  localStorage.removeItem("admin");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
};

// Fix login
// finish protected Route
// Logout
