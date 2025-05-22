import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, KeyValidateResponse } from "../../typings/global";

interface ValidityInterface {
  loading: boolean;
  response: KeyValidateResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: ValidityInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const setKeyValiditySlice = createSlice({
  name: "setKeyValidityRequest",
  initialState,
  reducers: {
    setKeyValidityRequest(state) {
      state.loading = true;
    },
    setKeyValidityRequestSuccess(
      state,
      action: PayloadAction<KeyValidateResponse>
    ) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    setKeyValidityRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    setKeyValidityStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  setKeyValidityRequest,
  setKeyValidityRequestSuccess,
  setKeyValidityRequestError,
  setKeyValidityStateReset,
} = setKeyValiditySlice.actions;

export default setKeyValiditySlice.reducer;
