import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, KeysListResponse } from "../../typings/global";

interface getKeyCatalogsInterface {
  loading: boolean;
  response: KeysListResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: getKeyCatalogsInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getKeyCatalogsSlice = createSlice({
  name: "getKeyCatalogsRequest",
  initialState,
  reducers: {
    getKeyCatalogsLoading(state) {
      state.loading = true;
    },
    getKeyCatalogsSuccess(state, action: PayloadAction<KeysListResponse>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    getKeyCatalogsError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    getKeyCatalogsStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  getKeyCatalogsLoading,
  getKeyCatalogsSuccess,
  getKeyCatalogsError,
  getKeyCatalogsStateReset,
} = getKeyCatalogsSlice.actions;

export default getKeyCatalogsSlice.reducer;
