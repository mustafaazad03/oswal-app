// pages/auth/redirect.js
import React from 'react';
import { useRouter } from 'next/router';

const AuthRedirect = () => {
  const router = useRouter();

  React.useEffect(() => {
    // Handle any authentication logic and redirect the user to the desired page
    // For example, save the token and redirect to the home page
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  return <div>Completing authentication...</div>;
};

export default AuthRedirect;
