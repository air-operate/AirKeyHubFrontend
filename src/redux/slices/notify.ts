import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface notifyInterface {
  loading: boolean;
  response: string | undefined;
  error: API_ERROR | undefined;
}

const initialState: notifyInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const notifySlice = createSlice({
  name: "notifyRequest",
  initialState,
  reducers: {
    notifyRequest(state) {
      state.loading = true;
    },
    notifyRequestSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    notifyRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    notifyStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  notifyRequest,
  notifyRequestSuccess,
  notifyRequestError,
  notifyStateReset,
} = notifySlice.actions;

export default notifySlice.reducer;
