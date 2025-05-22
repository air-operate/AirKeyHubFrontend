import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, SignInRes } from "../../typings/global";

interface SignInUserInterface {
  loading: boolean;
  response: SignInRes | undefined;
  error: API_ERROR | undefined;
}

const initialState: SignInUserInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const signInUserSlice = createSlice({
  name: "signInUserRequest",
  initialState,
  reducers: {
    signInUserRequest(state) {
      state.loading = true;
    },
    signInUserRequestSuccess(state, action: PayloadAction<SignInRes>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    signInUserRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    signInUserStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  signInUserRequest,
  signInUserRequestSuccess,
  signInUserRequestError,
  signInUserStateReset,
} = signInUserSlice.actions;

export default signInUserSlice.reducer;
