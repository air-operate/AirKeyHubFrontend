import { getAuthToken } from "src/asyncstorage";
import { GET_COLLECTION_CODE_URL } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  getCollectionCodeSuccess,
  getCollectionCodeLoading,
  getCollectionCodeError,
} from "../slices/getCollectionCode";

export const getCollectionCodeAPI =
  (id: string) => async (dispatch: any | undefined) => {
    try {
      dispatch(getCollectionCodeLoading());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "GET",
        url: `${GET_COLLECTION_CODE_URL}?id=${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(getCollectionCodeSuccess(resp?.data));
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
          dispatch(getCollectionCodeError(_error));
        });
    } catch (error) {}
  };
