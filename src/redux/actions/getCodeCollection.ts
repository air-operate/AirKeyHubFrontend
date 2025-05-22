import { getAuthToken } from "src/asyncstorage";
import { GET_CODE_COLLECTION } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  getCodeCollectionLoading,
  getCodeCollectionError,
  getCodeCollectionSuccess,
} from "../slices/getCodeCollection";

export const getCodeCollection =
  (param: { keyId: string }) => async (dispatch: any | undefined) => {
    try {
      dispatch(getCodeCollectionLoading());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "GET",
        url: GET_CODE_COLLECTION,
        params: param,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(getCodeCollectionSuccess(resp?.data));
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
          dispatch(getCodeCollectionError(_error));
        });
    } catch (error) {}
  };
