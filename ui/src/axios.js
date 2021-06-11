import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5555",
  timeout: 13000,
});

export default instance;
