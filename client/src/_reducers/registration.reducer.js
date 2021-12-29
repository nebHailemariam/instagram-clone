import { userConstants } from "../_constants/user.constants";
const initialRegistrationState = {};

const registration = (state = initialRegistrationState, action) => {
  if (action.type === userConstants.REGISTRATION_REQUEST) {
    return { ...state, loading: true };
  } else if (action.type === userConstants.REGISTRATION_SUCCESS) {
    return { ...state, loading: false };
  } else if (action.type === userConstants.REGISTRATION_FAILURE) {
    return { ...state, loading: false, error: action.payload.error };
  } else return state;
};

export default registration;
