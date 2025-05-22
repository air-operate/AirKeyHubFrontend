import { NOTIFY_URL } from "../../api/endpoints/endpoints";
import {
  notifyRequest,
  notifyRequestError,
  notifyRequestSuccess,
} from "../slices/notify";
import axiosTokenInstance from "../../service/network/axios";
import { getAuthToken } from "src/asyncstorage";

export const notifyOwnerRequest =
  (param: { key_host_id: string }) => async (dispatch: any | undefined) => {
    let token = await getAuthToken();
    try {
      dispatch(notifyRequest());
      axiosTokenInstance({
        method: "POST",
        url: NOTIFY_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          console.log(resp.data);
          
          dispatch(notifyRequestSuccess(resp?.data?.message));
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
          console.log(error.response.data);
          
          dispatch(notifyRequestError(_error));
        });
    } catch (error) {}
  };
