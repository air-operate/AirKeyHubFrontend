import axiosTokenInstance from "../../service/network/axios";
import { UPDATE_KEY_URL } from "src/api/endpoints/endpoints";
import {
  updateKeyRequest,
  updateKeyRequestError,
  updateKeyRequestSuccess,
} from "../slices/updateKey";
import { getAuthToken } from "src/asyncstorage";
import { IUpdateKey } from "@interfaces/iUpdateKey";

export const updateKeyAPI =
  (param: IUpdateKey) => async (dispatch: any | undefined) => {
    try {
      dispatch(updateKeyRequest());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "POST",
        url: UPDATE_KEY_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(updateKeyRequestSuccess(resp?.data));
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
          dispatch(updateKeyRequestError(_error));
        });
    } catch (error) {}
  };
