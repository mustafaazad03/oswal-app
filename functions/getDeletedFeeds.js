export const getDeletedFeeds = async (userId) => {
  // console.log(`userid`, userId);
  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/post/deleted/${userId}`
  );
  const userData = await userResponse.json();
  return userData;
  if (!response.ok) {
    throw new Error('Failed to save post.');
  }
  return response.json();
};
