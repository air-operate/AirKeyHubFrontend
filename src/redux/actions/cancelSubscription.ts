import axiosTokenInstance from "../../service/network/axios";
import { CANCEL_SUBSCRIPTION_URL } from "src/api/endpoints/endpoints";
import {
  cancelSubscriptionRequest,
  cancelSubscriptionRequestError,
  cancelSubscriptionRequestSuccess,
} from "../slices/cancelSubscription";
import { getAuthToken } from "src/asyncstorage";

export const cancelSubscriptionAPIRequest =
  (param: { key_Id: string }) => async (dispatch: any | undefined) => {
    try {
      dispatch(cancelSubscriptionRequest());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "POST",
        url: CANCEL_SUBSCRIPTION_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(cancelSubscriptionRequestSuccess(resp?.data));
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
          dispatch(cancelSubscriptionRequestError(_error));
        });
    } catch (error) {}
  };
