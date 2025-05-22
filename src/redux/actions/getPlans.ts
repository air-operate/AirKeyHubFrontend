import { getAuthToken, getUserDetails, storeData } from 'src/asyncstorage';
import { GET_PLANS_URL } from '../../api/endpoints/endpoints';
import axiosTokenInstance from '../../service/network/axios';
import {
  getPlansError,
  getPlansLoading,
  getPlansSuccess,
} from '../slices/getPlans';
import { isCountrySupportedForTransfers } from '@screens/subscriptionplan/methods';

export const getPlans = () => async (dispatch: any | undefined) => {
  try {
    dispatch(getPlansLoading());
    const data = await getUserDetails();
    const supported_currency = await isCountrySupportedForTransfers(
      // 'Sudan'
      data?.country || 'United States'
    );
    storeData('local_currency', supported_currency);
    const token = await getAuthToken();
    axiosTokenInstance({
      method: 'GET',
      url: GET_PLANS_URL,
      params: { user_local_currency: supported_currency },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        dispatch(getPlansSuccess(resp?.data));
      })
      .catch((error: any) => {
        const _error = {
          data: error?.response?.status
            ? error?.response?.data?.message || error?.message
            : 'Something went wrong. Try again!',
          status:
            error?.response?.data.statusCode || error?.response?.status || 500,
        };
        dispatch(getPlansError(_error));
      });
  } catch (error: any) {
    const _error = {
      data: error?.response?.status
        ? error?.response?.data?.message || error?.message
        : 'Something went wrong. Try again!',
      status:
        error?.response?.data.statusCode || error?.response?.status || 500,
    };
    dispatch(getPlansError(_error));
  }
};
