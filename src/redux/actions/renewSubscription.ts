import axiosTokenInstance from "../../service/network/axios";
import { RENEW_SUBSCRIPTION_URL } from "src/api/endpoints/endpoints";
import {
  renewSubscriptionRequest,
  renewSubscriptionRequestError,
  renewSubscriptionRequestSuccess,
} from "../slices/renewSubscription";
import { getAuthToken } from "src/asyncstorage";
import { IRenewSubscription } from "@interfaces/IRenewSubscription";

export const renewSubscriptionAPIRequest =
  (param: IRenewSubscription) => async (dispatch: any | undefined) => {
    try {
      dispatch(renewSubscriptionRequest());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "POST",
        url: RENEW_SUBSCRIPTION_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(renewSubscriptionRequestSuccess(resp?.data));
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
          dispatch(renewSubscriptionRequestError(_error));
        });
    } catch (error) {}
  };
