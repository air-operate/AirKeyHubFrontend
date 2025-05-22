import { LogOutUserData } from "@interfaces/ILogOutUser";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface logOutUserInterface {
  loading: boolean;
  response: LogOutUserData | undefined;
  error: API_ERROR | undefined;
}

const initialState: logOutUserInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const logOutSlice = createSlice({
  name: "logOutRequest",
  initialState,
  reducers: {
    logOutUserLoading(state) {
      state.loading = true;
    },
    logOutUserSuccess(state, action: PayloadAction<LogOutUserData>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    logOutUserError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    logoutUserReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  logOutUserLoading,
  logOutUserSuccess,
  logOutUserError,
  logoutUserReset,
} = logOutSlice.actions;

export default logOutSlice.reducer;
