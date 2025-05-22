import axiosTokenInstance from "../../service/network/axios";
import { DELETE_KEY_URL } from "src/api/endpoints/endpoints";
import {
  deleteKeyRequest,
  deleteKeyRequestError,
  deleteKeyRequestSuccess,
} from "../slices/deleteKey";
import { getAuthToken } from "src/asyncstorage";

export const deleteKeyAPIRequest =
  (param: { key_id: string }) => async (dispatch: any | undefined) => {
    try {
      dispatch(deleteKeyRequest());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "DELETE",
        url: DELETE_KEY_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(deleteKeyRequestSuccess(resp?.data));
        })
        .catch((error: any) => {
          const _error = {
            data: error?.response?.status
              ? error?.response?.data?.message || error?.message
              : "Something went wrong. Try again!",
            status:
              error?.response?.data.statusCode ||
              error?.response?.status ||
              500,
          };
          dispatch(deleteKeyRequestError(_error));
          console.log(error.response.data);
        });
    } catch (error) {}
  };
