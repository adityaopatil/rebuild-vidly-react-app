import axios from "axios";
import { getJwt } from "./authService";

axios.defaults.headers.common["x-auth-token"] = getJwt();

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
