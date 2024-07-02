import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { notify } from './Toast';

export const handleDeactivation = async (
  setIsDeactivated,
  password,
  setChildModal
) => {
  const token = Cookies.get('auth');

  if (!token) {
    return;
  }

  const decodeJwt = jwt.decode(token);
  const username = decodeJwt.username;
  const form = { password: password };

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/auth/deactivate-account/${username}`,
      {
        data: form,
      }
    );

    if (res.status === 200) {
      console.log(res);
      notify('Account deactivated successfully', 'success');
      setIsDeactivated(true);
      setChildModal(false);
    }
  } catch (error) {
    notify('An error occurred, please try again', 'error');
  }
};
