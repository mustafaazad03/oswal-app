export const handleUnlike = async ({ username, postId }) => {
  const form = { postId: postId };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/user/unlike/${username}`,
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
    throw new Error('Failed to unlike post.');
  }
  return response.json();
};
