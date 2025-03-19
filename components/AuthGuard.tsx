import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAppSelector } from '../store/hooks';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

/**
 * AuthGuard component to protect routes based on authentication status
 * @param children - The components to render if authentication check passes
 * @param requireAuth - If true, redirects to login if not authenticated
 *                      If false, redirects to home if authenticated
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [shouldRender, setShouldRender] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If loading, do nothing yet
    if (isLoading) return;

    // Determine if we should render the children
    let shouldRenderContent = true;

    // Check authentication conditions
    if (requireAuth && !isAuthenticated) {
      shouldRenderContent = false;
    } else if (!requireAuth && isAuthenticated) {
      shouldRenderContent = false;
    }

    // Set initial render state
    setShouldRender(shouldRenderContent);

    // If we shouldn't render, schedule navigation for next frame
    // This ensures the Root Layout is mounted before navigation
    if (!shouldRenderContent) {
      const timer = setTimeout(() => {
        if (requireAuth && !isAuthenticated) {
          router.replace('/login');
        } else if (!requireAuth && isAuthenticated) {
          router.replace('/');
        }
      }, 100); // Small delay to ensure layout is mounted

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, requireAuth, router]);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If we should render the children, do so
  if (shouldRender) {
    return <>{children}</>;
  }

  // Return loading view while redirecting
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default AuthGuard; 