import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, PasswordChangeResponse } from "../../typings/global";

interface resetPasswordInterface {
  loading: boolean;
  response: PasswordChangeResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: resetPasswordInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const resetPasswordSlice = createSlice({
  name: "resetPasswordRequest",
  initialState,
  reducers: {
    resetPasswordRequest(state) {
      state.loading = true;
    },
    resetPasswordRequestSuccess(
      state,
      action: PayloadAction<PasswordChangeResponse>
    ) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    resetPasswordRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    resetPasswordStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  resetPasswordRequest,
  resetPasswordRequestSuccess,
  resetPasswordRequestError,
  resetPasswordStateReset,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
