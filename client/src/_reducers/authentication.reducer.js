import { userConstants } from "../_constants/user.constants";

let currentUserToken = JSON.parse(localStorage.getItem("currentUserToken"));

const initialUserState = currentUserToken
  ? { isLoggedIn: true, userToken: currentUserToken }
  : { isLoggedIn: false };

const authentication = (state = initialUserState, action) => {
  if (action.type === userConstants.LOGIN_REQUEST) {
    return { ...state, loading: true };
  } else if (action.type === userConstants.LOGIN_SUCCESS) {
    return {
      ...state,
      userToken: action.payload.userToken,
      loading: false,
      isLoggedIn: true,
    };
  } else if (action.type === userConstants.LOGIN_FAILURE) {
    return {
      ...state,
      userToken: {},
      loading: false,
      error: action.payload.error,
    };
  } else if (action.type === userConstants.LOGOUT) {
    return { userToken: {}, loading: false, isLoggedIn: false, error: null };
  } else return state;
};

export default authentication;
