import userService from "../_services/user.service";
import { userConstants } from "../_constants/user.constants";
// import history from "../_helpers/history";

const login = (email, password) => {
  return async (dispatch) => {
    dispatch(request());
    try {
      const user = await userService.login(email, password);
      dispatch(success(user));
      // history.push("/");
    } catch (error) {
      dispatch(failure(error));
    }
  };
  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, payload: { user } };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, payload: { error } };
  }
};

const logout = () => {
  return (dispatch) => {
    dispatch(request());
  };
  function request() {
    return { type: userConstants.LOGOUT };
  }
};

const AuthenticationActions = {
  login,
  logout,
};
export default AuthenticationActions;
