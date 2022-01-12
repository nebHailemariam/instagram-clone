import userService from "../_services/user.service";
import { userConstants } from "../_constants/user.constants";

const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(request());
    try {
      const userToken = await userService.login(email, password);
      dispatch(success(userToken));
      navigate("/");
    } catch (error) {
      dispatch(failure(error));
    }
  };
  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(userToken) {
    return { type: userConstants.LOGIN_SUCCESS, payload: { userToken } };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, payload: { error } };
  }
};

const logout = (navigate) => {
  return (dispatch) => {
    dispatch(request());
    localStorage.removeItem("currentUserToken");
    navigate("/login");
  };
  function request() {
    return { type: userConstants.LOGOUT };
  }
};

const authenticationActions = {
  login,
  logout,
};
export default authenticationActions;
