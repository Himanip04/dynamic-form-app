
import axios from "axios";

export const api = axios.create({
  baseURL: "https://taskmatbook.up.railway.app/api",
 // baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
});



