export const sendVerification = async (emailOrMobile) => {
  const queryParam = emailOrMobile.includes('@')
    ? `email=${emailOrMobile}`
    : `phone=${emailOrMobile}`;
  const endpoint = emailOrMobile.includes('@')
    ? 'forget-password'
    : 'phone-verification';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/auth/${endpoint}?${queryParam}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to send verification code.');
  }

  return response.json();
};
