import userService from "../_services/user.service";
import { userConstants } from "../_constants/user.constants";

export const authenticationActions = {
  login,
  logout,
  register,
};

const login = (email, password) => {
  return async (dispatch) => {
    dispatch(request());
    try {
      const user = await userService.login(email, password);
      dispatch(success(user));
    } catch (error) {
      dispatch(failure(error));
    }
  };
  request = () => {
    return { type: userConstants.LOGIN_REQUEST };
  };
  success = (user) => {
    return { type: userConstants.LOGIN_SUCCESS, payload: { user } };
  };
  failure = (error) => {
    return { type: userConstants.LOGIN_FAILURE, payload: { error } };
  };
};

const logout = () => {
  return (dispatch) => {
    dispatch(logout());
  };
  logout = () => {
    return { type: userConstants.LOGOUT };
  };
};

const register = (fullName, email, password) => {
  return async (dispatch) => {
    dispatch(request());
    try {
      await userService.register(fullName, email, password);
      dispatch(success());
    } catch (error) {
      dispatch(failure(error));
    }
  };
  request = () => {
    return { type: userConstants.REGISTRATION_REQUEST };
  };
  success = () => {
    return { type: userConstants.REGISTRATION_SUCCESS };
  };
  failure = (error) => {
    return { type: userConstants.REGISTRATION_FAILURE, payload: { error } };
  };
};
