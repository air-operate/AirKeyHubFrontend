import { IContactUs } from "@interfaces/IContactUsInterface";
import { getAuthToken } from "src/asyncstorage";
import { CONTACT_US } from "../../api/endpoints/endpoints";
import axiosTokenInstance from "../../service/network/axios";
import {
  contactUsRequest,
  contactUsRequestError,
  contactUsRequestSuccess,
} from "../slices/contactUs";

export const contactUs =
  (param: IContactUs) => async (dispatch: any | undefined) => {
    try {
      dispatch(contactUsRequest());
      let token = await getAuthToken();
      console.log({token});
      
      axiosTokenInstance({
        method: "POST",
        url: CONTACT_US,
        data: param,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          dispatch(contactUsRequestSuccess(resp?.data));
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
          console.log(error.response.data);
          
          dispatch(contactUsRequestError(_error));
        });
    } catch (error) {}
  };
