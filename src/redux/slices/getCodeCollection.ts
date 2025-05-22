import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";
import { CodeCollectionResponse } from "@interfaces/ICodeCollection";

interface getCodeCollectionInterface {
  loading: boolean;
  response: CodeCollectionResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: getCodeCollectionInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getCodeCollectionSlice = createSlice({
  name: "getCodeCollectionRequest",
  initialState,
  reducers: {
    getCodeCollectionLoading(state) {
      state.loading = true;
    },
    getCodeCollectionSuccess(
      state,
      action: PayloadAction<CodeCollectionResponse>
    ) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    getCodeCollectionError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    getCodeCollectionStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  getCodeCollectionLoading,
  getCodeCollectionSuccess,
  getCodeCollectionError,
  getCodeCollectionStateReset,
} = getCodeCollectionSlice.actions;

export default getCodeCollectionSlice.reducer;
