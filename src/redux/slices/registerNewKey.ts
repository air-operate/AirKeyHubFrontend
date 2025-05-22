import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, ScanKeyResponse, } from "../../typings/global";

interface RegisterNewKeyInterface {
  loading: boolean;
  response: ScanKeyResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: RegisterNewKeyInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const registerNewKeySlice = createSlice({
  name: "registerNewKeyRequest",
  initialState,
  reducers: {
    registerNewKeyRequest(state) {
      state.loading = true;
    },
    registerNewKeyRequestSuccess(state, action: PayloadAction<ScanKeyResponse>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    registerNewKeyRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    registerNewKeyStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  registerNewKeyRequest,
  registerNewKeyRequestSuccess,
  registerNewKeyRequestError,
  registerNewKeyStateReset,
} = registerNewKeySlice.actions;

export default registerNewKeySlice.reducer;
