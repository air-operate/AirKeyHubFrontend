import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, ResendOtpRes } from "../../typings/global";

interface resendOtpInterface {
  loading: boolean;
  response: ResendOtpRes | undefined;
  error: API_ERROR | undefined;
}

const initialState: resendOtpInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const resendOtpSlice = createSlice({
  name: "resendOtpRequest",
  initialState,
  reducers: {
    resendOtpRequest(state) {
      state.loading = true;
    },
    resendOtpRequestSuccess(state, action: PayloadAction<ResendOtpRes>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    resendOtpRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    resendOtpStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  resendOtpRequest,
  resendOtpRequestSuccess,
  resendOtpRequestError,
  resendOtpStateReset,
} = resendOtpSlice.actions;

export default resendOtpSlice.reducer;
