import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, unreadCountResponse } from "../../typings/global";

interface unreadCountInterface {
  loading: boolean;
  response: unreadCountResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: unreadCountInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const unreadCountSlice = createSlice({
  name: "unreadCountRequest",
  initialState,
  reducers: {
    unreadCountRequest(state) {
      state.loading = true;
    },
    unreadCountRequestSuccess(
      state,
      action: PayloadAction<unreadCountResponse>
    ) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    unreadCountRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    unreadCountStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  unreadCountRequest,
  unreadCountRequestSuccess,
  unreadCountRequestError,
  unreadCountStateReset,
} = unreadCountSlice.actions;

export default unreadCountSlice.reducer;
