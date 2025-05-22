import { getAuthToken } from 'src/asyncstorage';
import { DELETE_ACCOUNT_URL } from '../../api/endpoints/endpoints';
import axiosTokenInstance from '../../service/network/axios';

export const deleteAccountRequest = async () => {
  try {
    const token = await getAuthToken();
    axiosTokenInstance({
      method: 'DELETE',
      url: DELETE_ACCOUNT_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return resp;
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
