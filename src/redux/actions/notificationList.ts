import { NOTIFICATION_LIST_URL } from "../../api/endpoints/endpoints";
import {
  notificationRequest,
  notificationRequestError,
  notificationRequestSuccess,
} from "../slices/notificationList";
import axiosTokenInstance from "../../service/network/axios";
import { getAuthToken } from "src/asyncstorage";

export const notificationListAPI = () => async (dispatch: any | undefined) => {
  try {
    let token = await getAuthToken();
    dispatch(notificationRequest());
    axiosTokenInstance({
      method: "GET",
      url: NOTIFICATION_LIST_URL,
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
            error?.response?.data.statusCode || error?.response?.status || 500,
        };
        dispatch(notificationRequestError(_error));
      });
  } catch (error) {}
};
