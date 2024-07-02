import axios from 'axios';

export const getBlockedUsers = async (username) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/user/blocked/${username}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
