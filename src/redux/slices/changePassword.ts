import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface ChangePasswordInterface {
  loading: boolean;
  response: string | undefined;
  error: API_ERROR | undefined;
}

const initialState: ChangePasswordInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const changePasswordSlice = createSlice({
  name: "changePasswordRequest",
  initialState,
  reducers: {
    changePasswordRequest(state) {
      state.loading = true;
    },
    changePasswordRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    changePasswordRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    changePasswordStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  changePasswordRequest,
  changePasswordRequestSuccess,
  changePasswordRequestError,
  changePasswordStateReset,
} = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
