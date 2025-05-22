import { ContactUsResponse } from "@interfaces/IContactUs";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API_ERROR } from "../../typings/global";

interface ContactUsInterface {
  loading: boolean;
  response: ContactUsResponse | undefined;
  error: API_ERROR | undefined;
}

const initialState: ContactUsInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const contactUsSlice = createSlice({
  name: "contactUsRequest",
  initialState,
  reducers: {
    contactUsRequest(state) {
      state.loading = true;
    },
    contactUsRequestSuccess(state, action: PayloadAction<ContactUsResponse>) {
      state.loading = false;
      state.response = action.payload;
      state.error = undefined;
    },
    contactUsRequestError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
      state.response = undefined;
    },
    contactUsStateReset(state) {
      state.loading = false;
      state.error = undefined;
      state.response = undefined;
    },
  },
});

export const {
  contactUsRequest,
  contactUsRequestSuccess,
  contactUsRequestError,
  contactUsStateReset,
} = contactUsSlice.actions;

export default contactUsSlice.reducer;
