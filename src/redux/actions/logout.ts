import { getAuthToken } from "src/asyncstorage";
import { LOGOUT_HOST, LOGOUT_OWNER } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  logOutUserLoading,
  logOutUserSuccess,
  logOutUserError,
} from "../slices/logout";

export const logOutUser =
  (role: string) => async (dispatch: any | undefined) => {
    try {
      dispatch(logOutUserLoading());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "POST",
        url: role === "OWNER" ? LOGOUT_OWNER : LOGOUT_HOST,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(logOutUserSuccess(resp?.data));
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
          dispatch(logOutUserError(_error));
        });
    } catch (error) {}
  };
