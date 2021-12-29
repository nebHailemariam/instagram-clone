import { applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../_reducers/index";
import thunk from "redux-thunk";

const logger = createLogger();

const store = configureStore(
  { reducer: { rootReducer } },
  applyMiddleware(logger, thunk)
);

export default store;
