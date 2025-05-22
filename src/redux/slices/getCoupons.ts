import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, couponListResp } from "../../typings/global";

interface getCouponsInterface {
  loading: boolean;
  response: couponListResp | undefined;
  error: API_ERROR | undefined;
}

const initialState: getCouponsInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getCouponsSlice = createSlice({
  name: "getCouponsRequest",
  initialState,
  reducers: {
    getCouponsLoading(state) {
      state.loading = true;
    },
    getCouponsSuccess(state, action: PayloadAction<couponListResp>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    getCouponsError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    getCouponsStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  getCouponsLoading,
  getCouponsSuccess,
  getCouponsError,
  getCouponsStateReset,
} = getCouponsSlice.actions;

export default getCouponsSlice.reducer;
