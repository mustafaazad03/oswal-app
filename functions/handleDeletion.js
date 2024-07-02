import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { notify } from './Toast';
export const handleDeletion = async (router) => {
  const token = Cookies.get('auth');
  if (!token) {
    return;
  }

  const decodeJwt = jwt.decode(token);
  const username = decodeJwt.username;

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/user/${username}`
    );

    if (res.status === 200) {
      notify('Account deleted successfully', 'success');
      Cookies.remove('auth');
      router.push('/onboarding/login');
    }
  } catch (error) {
    notify('An error occurred, please try again', 'error');
  }
};
