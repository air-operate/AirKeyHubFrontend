import { getAuthToken } from "src/asyncstorage";
import { GET_OWNER_HISTORY } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  getOwnHistoryLoading,
  getOwnHistoryError,
  getOwnHistorySuccess,
} from "../slices/getOwnerHistory";

export const getOwnerHistories =
  (param: { keyId: string }) => async (dispatch: any | undefined) => {
    try {
      dispatch(getOwnHistoryLoading());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "GET",
        url: GET_OWNER_HISTORY,
        params: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(getOwnHistorySuccess(resp?.data));
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
          dispatch(getOwnHistoryError(_error));
        });
    } catch (error) {}
  };
