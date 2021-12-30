import { userConstants } from "../_constants/user.constants";

let currentUser = JSON.parse(localStorage.getItem("currentUser"));
const initialUserState = currentUser
  ? { isLoggedIn: true, user: currentUser }
  : { isLoggedIn: false };

const authentication = (state = initialUserState, action) => {
  if (action.type === userConstants.LOGIN_REQUEST) {
    return { ...state, loading: true };
  } else if (action.type === userConstants.LOGIN_SUCCESS) {
    return { ...state, user: action.payload.user, loading: false };
  } else if (action.type === userConstants.LOGIN_FAILURE) {
    return { ...state, user: {}, loading: false, error: action.payload.error };
  } else if (action.type === userConstants.LOGOUT) {
    return { user: {}, loading: false };
  } else if (action.type === userConstants.REGISTRATION_REQUEST) {
    return { ...state, loading: true };
  } else if (action.type === userConstants.REGISTRATION_SUCCESS) {
    return { ...state, loading: false };
  } else if (action.type === userConstants.REGISTRATION_FAILURE) {
    return { ...state, loading: false, error: action.payload.error };
  } else return state;
};

export default authentication;
