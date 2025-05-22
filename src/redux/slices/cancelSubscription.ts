import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface cancelSubscriptionInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: cancelSubscriptionInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const cancelSubscriptionSlice = createSlice({
  name: "cancelSubscriptionRequest",
  initialState,
  reducers: {
    cancelSubscriptionRequest(state) {
      state.loading = true;
    },
    cancelSubscriptionRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    cancelSubscriptionRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    cancelSubscriptionStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  cancelSubscriptionRequest,
  cancelSubscriptionRequestSuccess,
  cancelSubscriptionRequestError,
  cancelSubscriptionStateReset,
} = cancelSubscriptionSlice.actions;

export default cancelSubscriptionSlice.reducer;
