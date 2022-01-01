import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import registration from "./registration.reducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  authentication,
  registration,
  form: formReducer,
});

export default rootReducer;
