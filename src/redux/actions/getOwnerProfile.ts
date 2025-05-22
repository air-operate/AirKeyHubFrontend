import { getAuthToken } from "src/asyncstorage";
import { GET_OWNER_PROFILE_URL } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  getOwnProfileLoading,
  getOwnProfileError,
  getOwnProfileSuccess,
} from "../slices/profileDetail";

export const getOwnerProfile = () => async (dispatch: any | undefined) => {
  try {
    dispatch(getOwnProfileLoading());
    const token = await getAuthToken();
    axiosTokenInstance({
      method: "GET",
      url: GET_OWNER_PROFILE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        dispatch(getOwnProfileSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.status
            ? error?.response?.data?.message || error?.message
            : "Something went wrong. Try again!",
          status:
            error?.response?.data.statusCode || error?.response?.status || 500,
        };
        dispatch(getOwnProfileError(_error));
      });
  } catch (error) {}
};
