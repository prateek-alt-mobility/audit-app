import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { checkAuthStatus } from '../slices/authSlice';
// import { useAppSelector, useAppDispatch } from '../store/hooks';
// import { checkAuthStatus } from '../store/slices/authSlice';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(checkAuthStatus());
      setIsChecking(false);
    };
    
    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (!isChecking) {
      if (requireAuth && !isAuthenticated) {
        router.replace('/login');
      } else if (!requireAuth && isAuthenticated) {
        router.replace('/');
      }
    }
  }, [isAuthenticated, isChecking, requireAuth, router]);

  if (isChecking || isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}