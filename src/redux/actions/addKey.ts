import axiosTokenInstance from "../../service/network/axios";
import { ADD_KEY_URL, KEY_PAY_URL } from "src/api/endpoints/endpoints";
import {
  addKeyRequest,
  addKeyRequestError,
  addKeyRequestSuccess,
  addKeyStateReset,
} from "../slices/addKey";
import { getAuthToken } from "src/asyncstorage";
import { IAddKey } from "@interfaces/IAddKey";

export const addKeyAPIRequest =
  (param: IAddKey) => async (dispatch: any | undefined) => {
    try {
      dispatch(addKeyRequest());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "POST",
        url: ADD_KEY_URL,
        data: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(addKeyRequestSuccess(resp?.data));
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
          dispatch(addKeyRequestError(_error));
        });
    } catch (error) { }
  };

export const createPayment = (param: IAddKey) => (dispatch: any | undefined) => {
  return new Promise((resolve, reject) => {
    dispatch(addKeyRequest());
    getAuthToken()
      .then(async (token) => {
        try {
          const resp = await axiosTokenInstance({
            method: "POST",
            url: KEY_PAY_URL,
            data: param,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          console.log({ param }, resp.data.data);
          if (resp.data.data.subscription_active_status === "active") {
            dispatch(addKeyAPIRequest({ ...param, ...resp.data.data }));
          }
          dispatch(addKeyStateReset())
          resolve(resp.data); // Resolve the Promise with the response data
        } catch (error: any) {
          const _error = {
            data: error?.response?.status
              ? error?.response?.data?.message || error?.message
              : "Something went wrong. Try again!",
            status: error?.response?.data.statusCode || error?.response?.status || 500,
          };
          dispatch(addKeyStateReset())
          console.log(error, _error);
          reject(_error); // Reject the Promise with the error
        }
      })
      .catch((error) => {
        const _error = {
          data: error?.message || "Something went wrong. Try again!",
          status: 500,
        };
        console.log(error, _error);
        dispatch(addKeyRequestError(_error));
        reject(_error); // Reject if getting the token fails
      });
  });
};
