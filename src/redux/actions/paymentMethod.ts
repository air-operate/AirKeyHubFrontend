import { getAuthToken } from "src/asyncstorage";
import { GET_PAYMENT_METHOD_URL } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  paymentMethodLoading,
  paymentMethodError,
  paymentMethodSuccess,
} from "../slices/paymentMethod";

export const getPaymentMethodAPI = () => async (dispatch: any | undefined) => {
  try {
    dispatch(paymentMethodLoading());
    const token = await getAuthToken();
    axiosTokenInstance({
      method: "GET",
      url: GET_PAYMENT_METHOD_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        console.log(JSON.stringify(resp.data), 'jsonsoos')
        const uniquePaymentMethods = resp.data.data.filter((value: any, index: number, self: any) =>
          index === self.findIndex((t: any) => (
            t.last4 === value.last4
          ))
        );

        // Create a new response object with unique payment methods
        const updatedResponse = {
          ...resp.data,
          data: uniquePaymentMethods,
        };

        dispatch(paymentMethodSuccess(updatedResponse)); // Dispatch the unique payment methods
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.status
            ? error?.response?.data?.message || error?.message
            : "Something went wrong. Try again!",
          status:
            error?.response?.data.statusCode || error?.response?.status || 500,
        };
        console.log(JSON.stringify(error.response.data), 'jsonsoos')
        dispatch(paymentMethodError(_error));
      });
  } catch (error) {}
};
