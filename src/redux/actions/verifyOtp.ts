import { VERIFY_OTP_URL } from "../../api/endpoints/endpoints";
import {
  verifyOtpRequest,
  verifyOtpRequestError,
  verifyOtpRequestSuccess,
} from "../slices/verifyOtp";
import axiosTokenInstance from "../../service/network/axios";
import { IVerifyOtpForm } from "@interfaces/IVerifyOtpForm";

export const verifyOtp =
  (param: IVerifyOtpForm) => async (dispatch: any | undefined) => {
    try {
      dispatch(verifyOtpRequest());
      axiosTokenInstance({
        method: "POST",
        url: VERIFY_OTP_URL,
        data: param,
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => {
          dispatch(verifyOtpRequestSuccess(resp?.data?.message));
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
          dispatch(verifyOtpRequestError(_error));
        });
    } catch (error) {}
  };
