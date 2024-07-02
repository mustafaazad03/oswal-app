import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export const handleUnblock = async (blockedUsername) => {
  const token = Cookies.get('auth');
  if (!token) {
    return;
  }
  let decodedToken;
  try {
    decodedToken = jwt.decode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return;
  }

  const username = decodedToken.username;
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/user/unblock/${username}`,
      { blockedUser: blockedUsername }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
