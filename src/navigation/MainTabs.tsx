// src/navigation/MainTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AreaSelectionScreen from '../screens/AreaSelectionScreen';
import CompaniesScreen from '../screens/CompaniesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import TrilhasStack from './TrilhasStack';
import FeedbackScreen from '../screens/FeedbackScreen';
import { Ionicons } from '@expo/vector-icons';

export type MainTabParamList = {
  Áreas: undefined;
  Trilhas: undefined;
  Empresas: undefined;
  Perfil: undefined;
  Sobre: undefined;
  Feedback: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22c55e',
        tabBarStyle: {
          backgroundColor: '#020617',
          borderTopColor: '#1f2937',
        },
      }}
    >
      <Tab.Screen
        name="Áreas"
        component={AreaSelectionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
          title: 'Áreas',
        }}
      />

      <Tab.Screen
        name="Trilhas"
        component={TrilhasStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
          title: 'Trilhas',
        }}
      />

      <Tab.Screen
        name="Empresas"
        component={CompaniesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-outline" size={size} color={color} />
          ),
          title: 'Empresas',
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          title: 'Perfil',
        }}
      />

      <Tab.Screen
        name="Sobre"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
          title: 'Sobre',
        }}
      />

      {/* Feedback AGORA DEPOIS DO SOBRE */}
      <Tab.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
          title: 'Feedback',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
