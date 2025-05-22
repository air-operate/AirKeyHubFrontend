import { getAuthToken } from "src/asyncstorage";
import { HOST_PROFILE_URL } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  hostProfileLoading,
  hostProfileError,
  hostProfileSuccess,
} from "../slices/hostProfile";

export const hostProfileAPI = () => async (dispatch: any | undefined) => {
  try {
    dispatch(hostProfileLoading());
    const token = await getAuthToken();
    axiosTokenInstance({
      method: "GET",
      url: HOST_PROFILE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        dispatch(hostProfileSuccess(resp?.data));
      })
      .catch((error) => {
        const _error = {
          data: error?.response?.status
            ? error?.response?.data?.message || error?.message
            : "Something went wrong. Try again!",
          status:
            error?.response?.data.statusCode || error?.response?.status || 500,
        };
        dispatch(hostProfileError(_error));
      });
  } catch (error) {}
};
