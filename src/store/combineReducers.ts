import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const reducers = combineReducers({
  user: userSlice,
});

export default reducers;
