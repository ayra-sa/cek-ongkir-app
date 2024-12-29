import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const WithAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('auth_token_test');
      if (token !== 'token1235564994iwerijef8734835jsdjfjsjf8u89945jksmfn') {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default WithAuth;
