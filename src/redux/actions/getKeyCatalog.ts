import { getAuthToken } from "src/asyncstorage";
import { GET_KEY_CATALOG_URL } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  getKeyCatalogsError,
  getKeyCatalogsLoading,
  getKeyCatalogsSuccess,
} from "../slices/getKeyCatalog";

export const getKeyCatalog = () => async (dispatch: any | undefined) => {
  try {
    dispatch(getKeyCatalogsLoading());
    const token = await getAuthToken();
    console.log({token});
    
    axiosTokenInstance({
      method: "GET",
      url: GET_KEY_CATALOG_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        dispatch(getKeyCatalogsSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.status
            ? error?.response?.data?.message || error?.message
            : "Something went wrong. Try again!",
          status:
            error?.response?.data.statusCode || error?.response?.status || 500,
        };
        dispatch(getKeyCatalogsError(_error));
      });
  } catch (error) {}
};
