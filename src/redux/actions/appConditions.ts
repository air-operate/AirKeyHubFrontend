import { getAuthToken } from "src/asyncstorage";
import { CONDITIONS_URL } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  conditionsLoading,
  conditionsError,
  conditionsSuccess,
} from "../slices/appConditions";

export const appConditionsAPI =
  (params: { type: string }) => async (dispatch: any | undefined) => {
    try {
      dispatch(conditionsLoading());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "GET",
        url: CONDITIONS_URL,
        params: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(conditionsSuccess(resp?.data));
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
          dispatch(conditionsError(_error));
        });
    } catch (error) {}
  };
