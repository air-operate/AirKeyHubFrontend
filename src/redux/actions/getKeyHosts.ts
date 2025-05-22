import { getAuthToken } from "src/asyncstorage";
import axiosTokenInstance from "../../service/network/axios";
import {
  getKeyHostsLoading,
  getKeyHostsError,
  getKeyHostsSuccess,
} from "../slices/getKeyHosts";
import { GET_KEY_HOSTS_URL } from "src/api/endpoints/endpoints";

export const getKeyHosts =
  (params: { latitude?: number; longitude?: number; radius?: number }) =>
  async (dispatch: any | undefined) => {
    try {
      dispatch(getKeyHostsLoading());
      const token = await getAuthToken();
      axiosTokenInstance({
        method: "GET",
        url: `${GET_KEY_HOSTS_URL}${
          params?.radius ? `?radius=${params.radius}` : ""
        }&latitude=${params.latitude}&longitude=${params.longitude}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(getKeyHostsSuccess(resp?.data));
          console.log(resp.data,"dfadsafds");
          
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
          console.log(error.response.data,"dfadsafds");
          dispatch(getKeyHostsError(_error));
        });
    } catch (error) {}
  };
