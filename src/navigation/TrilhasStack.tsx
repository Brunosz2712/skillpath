import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrackListScreen from '../screens/TrackListScreen';
import TrackDetailScreen from '../screens/TrackDetailScreen';

export type TrilhasStackParamList = {
  TrackList: { areaId?: string } | undefined;
  TrackDetail: { trackId: string; trackName: string };
};

const Stack = createNativeStackNavigator<TrilhasStackParamList>();

const TrilhasStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrackList" component={TrackListScreen} />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
};

export default TrilhasStack;
