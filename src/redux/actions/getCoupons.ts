import { getAuthToken } from "src/asyncstorage";
import { GET_COUPON_URL } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  getCouponsError,
  getCouponsLoading,
  getCouponsSuccess,
} from "../slices/getCoupons";

export const getCouponAPI = () => async (dispatch: any | undefined) => {
  try {
    dispatch(getCouponsLoading());
    const token = await getAuthToken();
    axiosTokenInstance({
      method: "GET",
      url: GET_COUPON_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        dispatch(getCouponsSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.status
            ? error?.response?.data?.message || error?.message
            : "Something went wrong. Try again!",
          status:
            error?.response?.data.statusCode || error?.response?.status || 500,
        };
        dispatch(getCouponsError(_error));
      });
  } catch (error) {}
};
