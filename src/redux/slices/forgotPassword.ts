import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface ForgotPasswordInterface {
  loading: boolean;
  response: string | undefined;
  error: API_ERROR | undefined;
}

const initialState: ForgotPasswordInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPasswordRequest",
  initialState,
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
    },
    forgotPasswordRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    forgotPasswordRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    forgotPasswordStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  forgotPasswordRequest,
  forgotPasswordRequestSuccess,
  forgotPasswordRequestError,
  forgotPasswordStateReset,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
