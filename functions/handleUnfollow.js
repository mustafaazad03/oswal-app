export const handleUnfollow = async ({ apniId, dusreKiId }) => {
  const form = { unfollowUserId: dusreKiId };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/user/${apniId}/unfollow`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    }
  );
  // console.log('formdata', form);
  if (!response.ok) {
    throw new Error('Failed to Unfollow user');
  }
  return response.json();
};
