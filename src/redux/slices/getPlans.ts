import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, subscriptionPlansRes } from "../../typings/global";

interface getPlansInterface {
  loading: boolean;
  response: subscriptionPlansRes | undefined;
  error: API_ERROR | undefined;
}

const initialState: getPlansInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getPlansSlice = createSlice({
  name: "getPlansRequest",
  initialState,
  reducers: {
    getPlansLoading(state) {
      state.loading = true;
    },
    getPlansSuccess(state, action: PayloadAction<subscriptionPlansRes>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    getPlansError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    getPlansStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  getPlansLoading,
  getPlansSuccess,
  getPlansError,
  getPlansStateReset,
} = getPlansSlice.actions;

export default getPlansSlice.reducer;
