import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isNotification: false,
};

export const GetNotificationInfoSlice = createSlice({
  name: "GetNotificationInfoSlice",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<boolean>) => {
      state.isNotification = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotification } = GetNotificationInfoSlice.actions;

export default GetNotificationInfoSlice.reducer;
