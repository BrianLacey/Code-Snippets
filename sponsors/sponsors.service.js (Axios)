import axiosInstance from "../config/axios.config";
// ... Code contributed from another team member.

const headers = {};
const url = `${process.env.REACT_APP_BASEPATH}/sponsors/`;

export function create(sponsorData) {
  const config = {
    headers,
    data: sponsorData,
    method: "POST"
  };
  return axiosInstance(url, config)
    .then(responseSuccessHandler)
    // ... Code contributed from another team member.
    .catch(responseErrorHandler);
}
export function readAll() {
  const config = {
    headers,
    method: "GET"
  };
  return axiosInstance(url, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}
export function update(sponsorData) {
  const config = {
    headers,
    data: sponsorData,
    method: "PUT"
  };
  return axiosInstance(url + sponsorData._id, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}
export function del(id) {
  const config = {
    headers,
    method: "DELETE"
  };
  return axiosInstance(url + id, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}
const responseSuccessHandler = response => {
  return response.data;
};
const responseErrorHandler = error => {
  console.log(error);
  return Promise.reject(error);
};
