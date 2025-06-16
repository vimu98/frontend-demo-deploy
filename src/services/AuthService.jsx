import axios from "axios";

const API = "http://13.48.107.128:8080/api/auth";

export const signup = (user) => axios.post(`${API}/signup`, user);
export const login = (user) => axios.post(`${API}/login`, user);