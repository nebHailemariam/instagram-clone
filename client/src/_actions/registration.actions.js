import userService from "../_services/user.service";
import { userConstants } from "../_constants/user.constants";

const register = (fullName, email, password, confirmPassword, navigate) => {
  return async (dispatch) => {
    dispatch(request());
    try {
      await userService.register(fullName, email, password, confirmPassword);
      dispatch(success());
      navigate("/login");
    } catch (error) {
      dispatch(failure(error));
    }
  };
  function request() {
    return { type: userConstants.REGISTRATION_REQUEST };
  }
  function success() {
    return { type: userConstants.REGISTRATION_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.REGISTRATION_FAILURE, payload: { error } };
  }
};

export const registrationActions = {
  register,
};
