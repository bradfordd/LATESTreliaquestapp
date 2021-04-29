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
  localStorage.removeItem("studentID");
  localStorage.removeItem("courseID");
  localStorage.removeItem("name");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getCurrentUserPermission() {
  try {
    const jwt_p = localStorage.getItem("teacher");
    return jwt_p;
  } catch (ex) {
    return null;
  }
}

export function getAdminStatus() {
  try {
    const jwt_p = localStorage.getItem("admin");
    return jwt_p;
  } catch (ex) {
    return null;
  }
}

export function getUserName() {
  try {
    const jwt_p = localStorage.getItem("name");
    return jwt_p;
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  getCurrentUserPermission,
  getAdminStatus,
  getUserName,
};

// Fix login
// finish protected Route
// Logout
