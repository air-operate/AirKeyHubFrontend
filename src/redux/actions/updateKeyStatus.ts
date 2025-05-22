import { IUpdateKeyStatus } from "@interfaces/IUpdateKeyStatus";
import {
  updateKeyStatusRequest,
  updateKeyStatusRequestError,
  updateKeyStatusRequestSuccess,
} from "../slices/updateKeyStatus";
import axiosTokenInstance from "src/service/network/axios";
import { KEY_STATUS_URL } from "src/api/endpoints/endpoints";
import { getAuthToken } from "src/asyncstorage";

export const updateKeyStatusAPI =
  (param: IUpdateKeyStatus) => async (dispatch: any | undefined) => {
    try {
      dispatch(updateKeyStatusRequest());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "PUT",
        url: KEY_STATUS_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(updateKeyStatusRequestSuccess(resp.data));
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
          dispatch(updateKeyStatusRequestError(_error));
        });
    } catch (error) {}
  };
