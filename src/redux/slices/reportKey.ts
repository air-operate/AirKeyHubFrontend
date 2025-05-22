import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface reportKeyInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: reportKeyInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const reportKeySlice = createSlice({
  name: "reportKeyRequest",
  initialState,
  reducers: {
    reportKeyRequest(state) {
      state.loading = true;
    },
    reportKeySuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    reportKeyError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    reportKeyStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  reportKeyRequest,
  reportKeySuccess,
  reportKeyError,
  reportKeyStateReset,
} = reportKeySlice.actions;

export default reportKeySlice.reducer;
