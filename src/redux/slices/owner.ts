import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, OwnerRes } from "../../typings/global";

interface ownerInterface {
  loading: boolean;
  response: OwnerRes | undefined;
  error: API_ERROR | undefined;
}

const initialState: ownerInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const ownerSlice = createSlice({
  name: "ownerRequest",
  initialState,
  reducers: {
    ownerRequest(state) {
      state.loading = true;
    },
    ownerRequestSuccess(state, action: PayloadAction<OwnerRes>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    ownerRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    ownerStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  ownerRequest,
  ownerRequestSuccess,
  ownerRequestError,
  ownerStateReset,
} = ownerSlice.actions;

export default ownerSlice.reducer;
