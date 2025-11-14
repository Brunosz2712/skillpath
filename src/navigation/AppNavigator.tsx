import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { useAuth } from '../contexts/AuthContext';
import { View, ActivityIndicator } from 'react-native';

const AppNavigator: React.FC = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 bg-surface-900 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
