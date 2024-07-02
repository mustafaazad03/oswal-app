export const handleLike = async ({ username, postId }) => {
  const form = { postId: postId };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/user/like/${username}`,
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
    throw new Error('Failed to Like post.');
  }
  return response.json();
};
