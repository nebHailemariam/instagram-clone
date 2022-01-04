import userService from "../_services/user.service";
import { userConstants } from "../_constants/user.constants";

const register = (fullName, email, password, confirmPassword, navigate) => {
  return async (dispatch) => {
    dispatch(request());
    try {
      let firstName = fullName.substr(0, fullName.indexOf(" "));
      let lastName = fullName.substr(fullName.indexOf(" ") + 1);

      await userService.register(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      );
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
