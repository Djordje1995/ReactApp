export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, ...action.user };
    default:
      return state;
  }
}
