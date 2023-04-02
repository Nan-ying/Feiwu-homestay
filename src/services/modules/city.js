import hyRequest from "../request";

export function getAllCities() {
  return hyRequest.get({
    url: "/city/all",
  });
}
