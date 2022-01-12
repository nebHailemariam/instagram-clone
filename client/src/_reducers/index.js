import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import registration from "./registration.reducer";
import { reducer as formReducer } from "redux-form";
import posts from "./posts.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  posts,
  form: formReducer,
});

export default rootReducer;
