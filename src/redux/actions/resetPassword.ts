import { IResetPass } from "@interfaces/IResetPass";
import { FORGOT_PASSWORD_URL } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  resetPasswordRequest,
  resetPasswordRequestError,
  resetPasswordRequestSuccess,
} from "../slices/resetPassword";

export const resetPassword =
  (param: IResetPass) => async (dispatch: any | undefined) => {
    try {
      dispatch(resetPasswordRequest());
      axiosTokenInstance({
        method: "POST",
        url: FORGOT_PASSWORD_URL,
        data: param,
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => {
          dispatch(resetPasswordRequestSuccess(resp?.data));
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
          dispatch(resetPasswordRequestError(_error));
        });
    } catch (error) {}
  };
