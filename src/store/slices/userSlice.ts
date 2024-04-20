import { IUser } from "@/utils/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {} as IUser,
  },
  reducers: {
    setUserInfo(state, action: PayloadAction<IUser>) {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
