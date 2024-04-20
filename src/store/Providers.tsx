"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { IUser } from "@/utils/types/types";
import { setUserInfo } from "./slices/userSlice";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const getUserFromLocalStorage = sessionStorage.getItem("user");
    if (getUserFromLocalStorage) {
      const parseUser: IUser = JSON.parse(getUserFromLocalStorage);
      store.dispatch(setUserInfo(parseUser));
    }
  }, []);
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default Providers;
