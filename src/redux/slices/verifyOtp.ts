import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface verifyOtpInterface {
  loading: boolean;
  response: string | undefined;
  error: API_ERROR | undefined;
}

const initialState: verifyOtpInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const verifyOtpSlice = createSlice({
  name: "signUpUserRequest",
  initialState,
  reducers: {
    verifyOtpRequest(state) {
      state.loading = true;
    },
    verifyOtpRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    verifyOtpRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    verifyOtpStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  verifyOtpRequest,
  verifyOtpRequestError,
  verifyOtpRequestSuccess,
  verifyOtpStateReset,
} = verifyOtpSlice.actions;

export default verifyOtpSlice.reducer;
