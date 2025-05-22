import { FORGOT_PASSWORD_URL } from "../../api/endpoints/endpoints";

import axiosTokenInstance from "../../service/network/axios";
import {
  forgotPasswordRequest,
  forgotPasswordRequestError,
  forgotPasswordRequestSuccess,
} from "../slices/forgotPassword";

export const resetPassword =
  (param: { email: string; password?: string }) =>
  async (dispatch: any | undefined) => {
    try {
      dispatch(forgotPasswordRequest());
      axiosTokenInstance({
        method: "POST",
        url: FORGOT_PASSWORD_URL,
        data: param,
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => {
          dispatch(forgotPasswordRequestSuccess(resp?.data.message));
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
          dispatch(forgotPasswordRequestError(_error));
        });
    } catch (error) {}
  };
