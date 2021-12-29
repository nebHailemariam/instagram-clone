import userService from "../_services/user.service";
import { userConstants } from "../_constants/user.constants";

export const registrationActions = {
  register,
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
