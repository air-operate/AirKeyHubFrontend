import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, UpdateKeyDetailResponse } from "../../typings/global";

interface UpdateKeyInterface {
  loading: boolean;
  response: UpdateKeyDetailResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: UpdateKeyInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const updateKeySlice = createSlice({
  name: "updateKeyRequest",
  initialState,
  reducers: {
    updateKeyRequest(state) {
      state.loading = true;
    },
    updateKeyRequestSuccess(
      state,
      action: PayloadAction<UpdateKeyDetailResponse>
    ) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    updateKeyRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    updateKeyStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  updateKeyRequest,
  updateKeyRequestSuccess,
  updateKeyRequestError,
  updateKeyStateReset,
} = updateKeySlice.actions;

export default updateKeySlice.reducer;
