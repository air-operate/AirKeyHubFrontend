import { RETIRE_KEY_URL } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  retireKeyRequest,
  retireKeyRequestError,
  retireKeyRequestSuccess,
} from "../slices/retireKey";
import { getAuthToken } from "src/asyncstorage";

export interface retireKeyInterface {
  _id: string;
  key_id: string;
  new_keyring_Id?: string;
  ops_type: 1 | 2;
}
export const retireKeyAPI =
  (param: retireKeyInterface) => async (dispatch: any | undefined) => {
    let token = await getAuthToken();
    try {
      dispatch(retireKeyRequest());
      axiosTokenInstance({
        method: "POST",
        url: RETIRE_KEY_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(retireKeyRequestSuccess(resp?.data));
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
          dispatch(retireKeyRequestError(_error));
        });
    } catch (error) {}
  };
