import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, } from "../../typings/global";

interface LinkKeyRingInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: LinkKeyRingInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const linkKeyRingSlice = createSlice({
  name: "linkKeyRingRequest",
  initialState,
  reducers: {
    linkKeyRingRequest(state) {
      state.loading = true;
    },
    linkKeyRingRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    linkKeyRingRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    linkKeyRingStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  linkKeyRingRequest,
  linkKeyRingRequestSuccess,
  linkKeyRingRequestError,
  linkKeyRingStateReset,
} = linkKeyRingSlice.actions;

export default linkKeyRingSlice.reducer;
