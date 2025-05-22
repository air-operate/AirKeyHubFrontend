import { REGISTER_URL } from "../../api/endpoints/endpoints";
import {
  ownerRequest,
  ownerRequestError,
  ownerRequestSuccess,
} from "../slices/owner";
import axiosTokenInstance from "../../service/network/axios";
import { ISignUpForm } from "@interfaces/iSignUpForm";

export const ownerRegisterRequest =
  (param: ISignUpForm) => async (dispatch: any | undefined) => {
    try {
      dispatch(ownerRequest());
      axiosTokenInstance({
        method: "POST",
        url: REGISTER_URL,
        data: param,
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => {
          dispatch(ownerRequestSuccess(resp.data));
          console.log(resp.data);
          
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
          dispatch(ownerRequestError(_error));
        });
    } catch (error) {}
  };
