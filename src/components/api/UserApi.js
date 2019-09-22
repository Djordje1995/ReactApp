import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080'
const LOGIN_API_URL = `${BASE_API_URL}/login`

const UserApi = {

    validateCredentials: function(user) {
        return axios.post(`${LOGIN_API_URL}/validate`, user);
    }

};

export default UserApi;

