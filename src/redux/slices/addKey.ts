import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, SignInRes } from "../../typings/global";

interface AddKeyInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: AddKeyInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const addKeySlice = createSlice({
  name: "addKeyRequest",
  initialState,
  reducers: {
    addKeyRequest(state) {
      state.loading = true;
    },
    addKeyRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    addKeyRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    addKeyStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  addKeyRequest,
  addKeyRequestSuccess,
  addKeyRequestError,
  addKeyStateReset,
} = addKeySlice.actions;

export default addKeySlice.reducer;
