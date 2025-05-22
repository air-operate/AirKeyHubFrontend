import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface updateKeyStatusInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: updateKeyStatusInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const updateKeyStatusSlice = createSlice({
  name: "updateKeyStatusRequest",
  initialState,
  reducers: {
    updateKeyStatusRequest(state) {
      state.loading = true;
    },
    updateKeyStatusRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    updateKeyStatusRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    updateKeyStatusStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  updateKeyStatusRequest,
  updateKeyStatusRequestSuccess,
  updateKeyStatusRequestError,
  updateKeyStatusStateReset,
} = updateKeyStatusSlice.actions;

export default updateKeyStatusSlice.reducer;
