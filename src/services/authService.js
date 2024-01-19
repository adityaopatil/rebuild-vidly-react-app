import httpService from "./httpService";
import config from "./config.json";
import { jwtDecode } from "jwt-decode";

export function login(email, password) {
  return httpService.post(`${config.vidlyAPI}/auth`, { email, password });
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwt ? jwtDecode(jwt) : null;
  } catch (err) {
    console.log("Invalid token", err.message);
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
}
