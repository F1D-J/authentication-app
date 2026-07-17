import axios from "axios";

const API = axios.create({
  baseURL: "https://authentication-app-production-fbb7.up.railway.app/api",
});

export default API;