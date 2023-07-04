import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    root: rootReducer,
    auth: authReducer,
  },
});
export default store;
