import axios from "axios";

axios.defaults.baseURL = "https://inventory-app-backend.vercel.app";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
