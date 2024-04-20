"use client";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./combineReducers";

const store = configureStore({
  reducer: reducers,
});

export default store;
export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
