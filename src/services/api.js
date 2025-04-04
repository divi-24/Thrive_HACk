import axios from "axios";

const api = axios.create({
  baseURL: "https://thrive-xbzt.onrender.com",  // Adjust based on your backend server
  withCredentials: true,           // Ensure cookies are sent if using sessions
});

export default api;
