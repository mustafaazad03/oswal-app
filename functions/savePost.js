export const savePost = async ({ userId, postId }) => {
  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/user/${userId}`
  );
  const userData = await userResponse.json();

  const updatedSavedPosts = [...userData.savedPosts, postId];
  const form = { savedPosts: updatedSavedPosts };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/user/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    }
  );
  // console.log('formdata', form);
  if (!response.ok) {
    throw new Error('Failed to save post.');
  }
  return response.json();
};
