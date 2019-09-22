import axios from "axios";

const BASE_API_URL = "http://localhost:8080";
const STUDY_API_URL = `${BASE_API_URL}/study`;

const StudyApi = {
  insertStudy: function(study) {
    return axios.post(`${STUDY_API_URL}/insert`, study);
  },
  studyOverview: function() {
    return axios.get(`${STUDY_API_URL}/overview`);
  }
};

export default StudyApi;
