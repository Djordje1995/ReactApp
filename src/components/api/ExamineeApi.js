import axios from "axios";

const BASE_API_URL = "http://localhost:8080";
const EXAMINEE_API_URL = `${BASE_API_URL}/examinee`;

const examineeApi = {
  insertExamineeInit: function() {
    return axios.post(`${EXAMINEE_API_URL}/init`);
  },
  insertExaminee: function(data) {
    return axios.post(`${EXAMINEE_API_URL}/insert`, data);
  }
};

export default examineeApi;
