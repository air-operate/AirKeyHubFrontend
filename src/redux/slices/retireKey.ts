import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, PasswordChangeResponse } from "../../typings/global";

interface retireKeyInterface {
  loading: boolean;
  response: PasswordChangeResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: retireKeyInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const retireKeySlice = createSlice({
  name: "retireKeyRequest",
  initialState,
  reducers: {
    retireKeyRequest(state) {
      state.loading = true;
    },
    retireKeyRequestSuccess(
      state,
      action: PayloadAction<PasswordChangeResponse>
    ) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    retireKeyRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    retireKeyStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  retireKeyRequest,
  retireKeyRequestSuccess,
  retireKeyRequestError,
  retireKeyStateReset,
} = retireKeySlice.actions;

export default retireKeySlice.reducer;
