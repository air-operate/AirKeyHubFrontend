import { getAuthToken } from "src/asyncstorage";
import axiosTokenInstance from "../../service/network/axios";
import {
  addKeyDetailError,
  addKeyDetailLoading,
  addKeyDetailSuccess,
} from "../slices/getKeyDetail";
import { KEY_DETAIL_URL } from "src/api/endpoints/endpoints";

export const getKeyDetail =
  (id: string) => async (dispatch: any | undefined) => {
    try {
      dispatch(addKeyDetailLoading());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "GET",
        url: `${KEY_DETAIL_URL}${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(addKeyDetailSuccess(resp?.data));
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
          dispatch(addKeyDetailError(_error));
        });
    } catch (error) {}
  };
