import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, KeyDetailResponse } from "../../typings/global";

interface addKeyDetailInterface {
  loading: boolean;
  response: KeyDetailResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: addKeyDetailInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getKeyDetailSlice = createSlice({
  name: "addKeyDetailRequest",
  initialState,
  reducers: {
    addKeyDetailLoading(state) {
      state.loading = true;
    },
    addKeyDetailSuccess(state, action: PayloadAction<KeyDetailResponse>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    addKeyDetailError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    addKeyDetailStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  addKeyDetailLoading,
  addKeyDetailSuccess,
  addKeyDetailError,
  addKeyDetailStateReset,
} = getKeyDetailSlice.actions;

export default getKeyDetailSlice.reducer;
