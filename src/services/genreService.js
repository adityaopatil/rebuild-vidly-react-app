import httpService from "./httpService";
import config from "./config.json";

export function getGenres() {
  return httpService.get(`${config.vidlyAPI}/genres`);
}

export function getGenre(id) {
  return httpService.get(`${config.vidlyAPI}/genres/${id}`);
}
