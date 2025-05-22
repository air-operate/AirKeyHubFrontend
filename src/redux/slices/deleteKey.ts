import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, SignInRes } from "../../typings/global";

interface deleteKeyInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: deleteKeyInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const deleteKeySlice = createSlice({
  name: "deleteKeyRequest",
  initialState,
  reducers: {
    deleteKeyRequest(state) {
      state.loading = true;
    },
    deleteKeyRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    deleteKeyRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    deleteKeyStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  deleteKeyRequest,
  deleteKeyRequestSuccess,
  deleteKeyRequestError,
  deleteKeyStateReset,
} = deleteKeySlice.actions;

export default deleteKeySlice.reducer;
