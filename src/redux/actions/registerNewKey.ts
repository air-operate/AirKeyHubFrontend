import { SCAN_QR_URL } from '../../api/endpoints/endpoints';
import {
  registerNewKeyRequest,
  registerNewKeyRequestError,
  registerNewKeyRequestSuccess,
} from '../slices/registerNewKey';
import axiosTokenInstance from '../../service/network/axios';
import { getAuthToken } from 'src/asyncstorage';

export const registerNewKeyAPI =
  (param: { code: string; type: number }) =>
  async (dispatch: any | undefined) => {
    try {
      let token = await getAuthToken();
      dispatch(registerNewKeyRequest());
      axiosTokenInstance({
        method: 'GET',
        url: `${SCAN_QR_URL}?code=${param.code}&type=${param.type}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          console.log(resp.data, param, token);
          dispatch(registerNewKeyRequestSuccess(resp?.data));
        })
        .catch((error: any) => {
          const _error = {
            data: error?.response?.status
              ? error?.response?.data?.message || error?.message
              : 'Something went wrong. Try again!',
            status:
              error?.response?.data.statusCode ||
              error?.response?.status ||
              500,
          };
          console.log(error.response.data, param, token);
          dispatch(registerNewKeyRequestError(_error));
        });
    } catch (error) {}
  };
