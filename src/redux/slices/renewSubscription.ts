import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface renewSubscriptionInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: renewSubscriptionInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const renewSubscriptionSlice = createSlice({
  name: "renewSubscriptionRequest",
  initialState,
  reducers: {
    renewSubscriptionRequest(state) {
      state.loading = true;
    },
    renewSubscriptionRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    renewSubscriptionRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    renewSubscriptionStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  renewSubscriptionRequest,
  renewSubscriptionRequestSuccess,
  renewSubscriptionRequestError,
  renewSubscriptionStateReset,
} = renewSubscriptionSlice.actions;

export default renewSubscriptionSlice.reducer;
