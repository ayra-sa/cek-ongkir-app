import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthGuard: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
