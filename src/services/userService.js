import httpService from "./httpService";
import config from "./config.json";

export function postUser(user) {
  return httpService.post(`${config.vidlyAPI}/users`, user);
}
