import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, paymentMethodResp } from "../../typings/global";

interface PaymentMethodInterface {
  loading: boolean;
  response: paymentMethodResp | undefined;
  error: API_ERROR | undefined;
}

const initialState: PaymentMethodInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const paymentMethodSlice = createSlice({
  name: "paymentMethodRequest",
  initialState,
  reducers: {
    paymentMethodLoading(state) {
      state.loading = true;
    },
    paymentMethodSuccess(state, action: PayloadAction<paymentMethodResp>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    paymentMethodError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    paymentMethodStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  paymentMethodLoading,
  paymentMethodSuccess,
  paymentMethodError,
  paymentMethodStateReset,
} = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
