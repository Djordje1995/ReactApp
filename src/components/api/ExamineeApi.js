import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080'
const EXAMINEE_API_URL = `${BASE_API_URL}/examinees`

const examineeApi = {

    getExamineeById: function(id) {
        return axios.get(`${EXAMINEE_API_URL}/${id}`);
    }

};

export default examineeApi;


