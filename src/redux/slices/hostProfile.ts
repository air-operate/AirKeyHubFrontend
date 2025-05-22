import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, HostProfileResponse } from "../../typings/global";

interface hostProfileInterface {
  loading: boolean;
  response: HostProfileResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: hostProfileInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const hostProfileSlice = createSlice({
  name: "hostProfileRequest",
  initialState,
  reducers: {
    hostProfileLoading(state) {
      state.loading = true;
    },
    hostProfileSuccess(state, action: PayloadAction<HostProfileResponse>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    hostProfileError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    hostProfileStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  hostProfileLoading,
  hostProfileSuccess,
  hostProfileError,
  hostProfileStateReset,
} = hostProfileSlice.actions;

export default hostProfileSlice.reducer;
