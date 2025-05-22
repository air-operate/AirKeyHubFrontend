import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR, ProfileDetailResponse } from "../../typings/global";

interface getOwnProfileInterface {
  loading: boolean;
  response: ProfileDetailResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: getOwnProfileInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getOwnProfileSlice = createSlice({
  name: "getOwnProfileRequest",
  initialState,
  reducers: {
    getOwnProfileLoading(state) {
      state.loading = true;
    },
    getOwnProfileSuccess(state, action: PayloadAction<ProfileDetailResponse>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    getOwnProfileError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    getOwnProfileStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  getOwnProfileLoading,
  getOwnProfileSuccess,
  getOwnProfileError,
  getOwnProfileStateReset,
} = getOwnProfileSlice.actions;

export default getOwnProfileSlice.reducer;
