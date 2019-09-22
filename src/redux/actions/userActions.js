import userApi from "../../components/api/UserApi";

export function login(user) {
  // return { type: "LOGIN_USER", user };
  return dispatch => {
    return userApi.validateCredentials(user);
  };
}
