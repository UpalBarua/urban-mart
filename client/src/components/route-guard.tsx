import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/context/auth-context';

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user?._id) {
      router.push('/login');
    }
  }, [user, router]);

  return user?._id ? children : null;
};

export default RouteGuard;
