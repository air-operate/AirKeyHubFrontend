import axiosTokenInstance from "../../service/network/axios";
import { SET_VALIDITY_URL } from "src/api/endpoints/endpoints";
import {
  setKeyValidityRequest,
  setKeyValidityRequestError,
  setKeyValidityRequestSuccess,
} from "../slices/setValidity";
import { getAuthToken } from "src/asyncstorage";

export const setKeyValidateAPI =
  (param: any) => async (dispatch: any | undefined) => {
    try {
      dispatch(setKeyValidityRequest());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "POST",
        url: SET_VALIDITY_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(setKeyValidityRequestSuccess(resp?.data));
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
          dispatch(setKeyValidityRequestError(_error));
        });
    } catch (error) {}
  };
