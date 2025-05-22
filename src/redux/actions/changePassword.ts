import { getAuthToken } from "src/asyncstorage";
import { CHANGE_PASSWORD_URL } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  changePasswordRequest,
  changePasswordRequestError,
  changePasswordRequestSuccess,
} from "../slices/changePassword";

export const changePassword =
  (param: { old_password: string; new_password: string }) =>
  async (dispatch: any | undefined) => {
    try {
      dispatch(changePasswordRequest());
      let token = await getAuthToken();
      axiosTokenInstance({
        method: "POST",
        url: CHANGE_PASSWORD_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(changePasswordRequestSuccess(resp?.data.message));
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
          dispatch(changePasswordRequestError(_error));
        });
    } catch (error) {}
  };
