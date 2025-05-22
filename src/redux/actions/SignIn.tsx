import { SignIn_URL } from "../../api/endpoints/endpoints";
import { ISignInForm } from "../../interfaces/ISignInForm";
import {
  signInUserRequest,
  signInUserRequestError,
  signInUserRequestSuccess,
} from "../slices/SignIn";
import axiosTokenInstance from "../../service/network/axios";

export const signInRequest =
  (param: ISignInForm) => async (dispatch: any | undefined) => {
    try {
      dispatch(signInUserRequest());
      axiosTokenInstance({
        method: "POST",
        url: SignIn_URL,
        data: param,
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => {
          dispatch(signInUserRequestSuccess(resp?.data));
        })
        .catch((error: any) => {
          const _error = {
            data: error?.response.status
              ? error?.response?.data?.message || error?.message
              : "Something went wrong. Try again!",
            status: error?.response?.status || error?.response?.status || 500,
          };
          dispatch(signInUserRequestError(_error));
          console.log(JSON.stringify(error.response), _error);
        });
    } catch (error) {
      console.log(error);
    }
  };
