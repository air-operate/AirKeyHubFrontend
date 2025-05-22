import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, KeyHostResponse } from "../../typings/global";

interface getKeyHostsInterface {
  loading: boolean;
  response: KeyHostResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: getKeyHostsInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getKeyHostsSlice = createSlice({
  name: "getKeyHostsRequest",
  initialState,
  reducers: {
    getKeyHostsLoading(state) {
      state.loading = true;
    },
    getKeyHostsSuccess(state, action: PayloadAction<KeyHostResponse>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    getKeyHostsError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    getKeyHostsStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  getKeyHostsLoading,
  getKeyHostsSuccess,
  getKeyHostsError,
  getKeyHostsStateReset,
} = getKeyHostsSlice.actions;

export default getKeyHostsSlice.reducer;
