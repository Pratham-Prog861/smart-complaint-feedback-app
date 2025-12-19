import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { AuthNavigator } from './AuthNavigator';
import { StudentTabNavigator } from './StudentTabNavigator';
import { AdminTabNavigator } from './AdminTabNavigator';
import { Loading } from '../components/Loading';

export const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading message="Initializing..." />;
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthNavigator />
      ) : user.role === 'admin' ? (
        <AdminTabNavigator />
      ) : (
        <StudentTabNavigator />
      )}
    </NavigationContainer>
  );
};
