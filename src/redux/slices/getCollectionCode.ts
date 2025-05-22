import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, CollectionCodeResponse } from "../../typings/global";

interface getCollectionCodeInterface {
  loading: boolean;
  response: CollectionCodeResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: getCollectionCodeInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getCollectionCodeSlice = createSlice({
  name: "getCollectionCodeRequest",
  initialState,
  reducers: {
    getCollectionCodeLoading(state) {
      state.loading = true;
    },
    getCollectionCodeSuccess(
      state,
      action: PayloadAction<CollectionCodeResponse>
    ) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    getCollectionCodeError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    getCollectionCodeStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  getCollectionCodeLoading,
  getCollectionCodeSuccess,
  getCollectionCodeError,
  getCollectionCodeStateReset,
} = getCollectionCodeSlice.actions;

export default getCollectionCodeSlice.reducer;
