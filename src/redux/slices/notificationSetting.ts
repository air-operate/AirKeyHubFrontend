import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface notificationInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: notificationInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const notificationSlice = createSlice({
  name: "notificationRequest",
  initialState,
  reducers: {
    notificationRequest(state) {
      state.loading = true;
    },
    notificationRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    notificationRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    notificationStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  notificationRequest,
  notificationRequestSuccess,
  notificationRequestError,
  notificationStateReset,
} = notificationSlice.actions;

export default notificationSlice.reducer;
