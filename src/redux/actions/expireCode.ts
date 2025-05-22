import { getAuthToken } from "src/asyncstorage";
import { EXPIRE_CODE_URL } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  expireCodeError,
  expireCodeRequest,
  expireCodeSuccess,
} from "../slices/expireCode";

export const expireCodeAPI =
  (param: any) => async (dispatch: any | undefined) => {
    try {
      dispatch(expireCodeRequest());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "POST",
        url: EXPIRE_CODE_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(expireCodeSuccess(resp?.data));
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
          dispatch(expireCodeError(_error));
        });
    } catch (error) {}
  };
