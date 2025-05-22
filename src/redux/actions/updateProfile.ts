import { IUpdateProfile } from "@interfaces/IUpdateProfile";
import {
  updateProfileRequest,
  updateProfileRequestError,
  updateProfileRequestSuccess,
} from "../slices/updateProfile";
import axiosTokenInstance from "src/service/network/axios";
import { UPDATE_PROFILE_URL } from "src/api/endpoints/endpoints";
import { getAuthToken } from "src/asyncstorage";

export const updateProfileAPI =
  (param: IUpdateProfile) => async (dispatch: any | undefined) => {
    try {
      dispatch(updateProfileRequest());
      const token = await getAuthToken();

      const formData = new FormData();

      formData.append("name", param.name);
      formData.append("countryCode", parseInt(param.countryCode));
      formData.append("phoneNumber", parseInt(param.phoneNumber));

      if (param.profileImage) {
        formData.append("profileImage", {
          uri: param.profileImage,
          name: "image.jpg", // Desired file name
          type: "image/jpeg", // Adjust the type as needed
        });
      } else {
        formData.append("profileImage", param.profileImage);
      }

      axiosTokenInstance({
        method: "POST",
        url: UPDATE_PROFILE_URL,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(updateProfileRequestSuccess(resp.data));
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
          dispatch(updateProfileRequestError(_error));
        });
    } catch (error) {}
  };
