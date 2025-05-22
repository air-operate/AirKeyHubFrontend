import { LINK_KEY_RING_URL } from "../../api/endpoints/endpoints";
import {
  linkKeyRingRequest,
  linkKeyRingRequestError,
  linkKeyRingRequestSuccess,
} from "../slices/linkKeyRing";
import axiosTokenInstance from "../../service/network/axios";
import { getAuthToken } from "src/asyncstorage";

export const linkKeyRingAPI =
  (param: { code: string; slot_id: number; _id: string, key_id: string }) =>
  async (dispatch: any | undefined) => {
    try {
      let token = await getAuthToken();
      dispatch(linkKeyRingRequest());
      axiosTokenInstance({
        method: "POST",
        url: LINK_KEY_RING_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          console.log(resp.data, param);
          
          dispatch(linkKeyRingRequestSuccess(resp?.data));
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
          console.log(error.response.data, param);
          dispatch(linkKeyRingRequestError(_error));
        });
    } catch (error) {}
  };
