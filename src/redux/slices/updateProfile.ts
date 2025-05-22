import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface UpdateProfileInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: UpdateProfileInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const updateProfileSlice = createSlice({
  name: "updateProfileRequest",
  initialState,
  reducers: {
    updateProfileRequest(state) {
      state.loading = true;
    },
    updateProfileRequestSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    updateProfileRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    updateProfileStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileRequestSuccess,
  updateProfileRequestError,
  updateProfileStateReset,
} = updateProfileSlice.actions;

export default updateProfileSlice.reducer;
