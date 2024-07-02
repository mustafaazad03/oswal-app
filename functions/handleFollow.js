export const handleFollow = async ({ apniId, dusreKiId }) => {
  const form = { followerId: dusreKiId };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/user/${apniId}/follow`,
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
    throw new Error('Failed to Follow user');
  }
  return response.json();
};
