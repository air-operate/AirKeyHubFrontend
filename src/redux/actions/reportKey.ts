import { REPORT_KEY_URL } from '../../api/endpoints/endpoints';
import {
  reportKeyRequest,
  reportKeyError,
  reportKeySuccess,
} from '../slices/reportKey';
import axiosTokenInstance from '../../service/network/axios';
import { getAuthToken } from 'src/asyncstorage';

export const reportKeyAPI =
  (param: { key_id: string; title: string; description: string }) =>
  async (dispatch: any | undefined) => {
    try {
      let token = await getAuthToken();
      dispatch(reportKeyRequest());
      axiosTokenInstance({
        method: 'POST',
        url: REPORT_KEY_URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: param,
      })
        .then((resp) => {
          console.log(resp.data, param);

          dispatch(reportKeySuccess(resp?.data));
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
          console.log(error.response.data, param);
          dispatch(reportKeyError(_error));
        });
    } catch (error) {}
  };
