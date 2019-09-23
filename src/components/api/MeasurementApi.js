import axios from "axios";

const BASE_API_URL = "http://localhost:8080";
const MEASUREMENT_API_URL = `${BASE_API_URL}/measurement`;

const measurementApi = {
  insertMeasurementInit: function() {
    return axios.post(`${MEASUREMENT_API_URL}/init`);
  },
  insertMeasurements: function(data) {
    return axios.post(`${MEASUREMENT_API_URL}/insert`, data);
  },
  measurementOverview: function() {
    return axios.get(`${MEASUREMENT_API_URL}/overview`);
  }
};

export default measurementApi;
