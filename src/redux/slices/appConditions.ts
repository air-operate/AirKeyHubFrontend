import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, conditionsResponse } from "../../typings/global";

interface conditionsInterface {
  loading: boolean;
  response: conditionsResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: conditionsInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const conditionsSlice = createSlice({
  name: "conditionsRequest",
  initialState,
  reducers: {
    conditionsLoading(state) {
      state.loading = true;
    },
    conditionsSuccess(state, action: PayloadAction<conditionsResponse>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    conditionsError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    conditionsStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  conditionsLoading,
  conditionsSuccess,
  conditionsError,
  conditionsStateReset,
} = conditionsSlice.actions;

export default conditionsSlice.reducer;
