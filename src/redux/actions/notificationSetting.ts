import { NOTIFICATION_SETTING_URL } from "../../api/endpoints/endpoints";
import {
  notificationRequest,
  notificationRequestError,
  notificationRequestSuccess,
} from "../slices/notificationSetting";
import axiosTokenInstance from "../../service/network/axios";
import { getAuthToken } from "src/asyncstorage";

export const notificationAPI =
  (param: { status: boolean }) => async (dispatch: any | undefined) => {
    try {
      let token = await getAuthToken();
      dispatch(notificationRequest());
      axiosTokenInstance({
        method: "PUT",
        url: NOTIFICATION_SETTING_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(notificationRequestSuccess(resp?.data));
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
          dispatch(notificationRequestError(_error));
        });
    } catch (error) {}
  };
