// src/components/GoogleAuthRedirect.js
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/common/Loader/Loader';

const GoogleAuthRedirect = () => {
  const fetchGoogleAuthRedirectUrl = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT + '/auth/google/login'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch redirect URL');
    }
    const data = await response.json();
    return data.redirectUrl;
  };

  const {
    data: redirectUrl,
    isLoading,
    isError,
    error,
  } = useQuery(['googleAuthRedirectUrl'], fetchGoogleAuthRedirectUrl);

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return null; // This component doesn't need to render anything
};

export default GoogleAuthRedirect;
