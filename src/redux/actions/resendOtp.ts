import { RESEND_OTP_URL } from "../../api/endpoints/endpoints";
import { ISignInForm } from "../../interfaces/ISignInForm";

import axiosTokenInstance from "../../service/network/axios";
import {
  resendOtpRequest,
  resendOtpRequestError,
  resendOtpRequestSuccess,
} from "../slices/resendOtp";

export const resendOtp =
  (param: { email: string; type: string }) =>
  async (dispatch: any | undefined) => {
    try {
      dispatch(resendOtpRequest());
      axiosTokenInstance({
        method: "POST",
        url: RESEND_OTP_URL,
        data: param,
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => {
          dispatch(resendOtpRequestSuccess(resp?.data));
        })
        .catch((error) => {
          const _error = {
            data: error?.response?.status
              ? error?.response?.data?.message || error?.message
              : "Something went wrong. Try again!",
            status:
              error?.response?.data.statusCode ||
              error?.response?.status ||
              500,
          };
          dispatch(resendOtpRequestError(_error));
        });
    } catch (error) {}
  };
