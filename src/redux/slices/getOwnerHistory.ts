import { OwnHistoryResponse } from "@interfaces/IGetOwnHistory";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface getOwnHistoryInterface {
  loading: boolean;
  response: OwnHistoryResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: getOwnHistoryInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getOwnHistorySlice = createSlice({
  name: "getOwnHistoryRequest",
  initialState,
  reducers: {
    getOwnHistoryLoading(state) {
      state.loading = true;
    },
    getOwnHistorySuccess(state, action: PayloadAction<OwnHistoryResponse>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    getOwnHistoryError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    getOwnHistoryStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  getOwnHistoryLoading,
  getOwnHistorySuccess,
  getOwnHistoryError,
  getOwnHistoryStateReset,
} = getOwnHistorySlice.actions;

export default getOwnHistorySlice.reducer;
