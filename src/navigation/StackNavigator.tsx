import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; 
import ListScreen from '../screens/ListScreen';
import FormScreen from '../screens/FormScreen';
import DetailScreen from '../screens/DetailScreen';
import StatsScreen from '../screens/StatsScreen';
import { RootStackParamList } from './typesNavigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    //  "Home"
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="List" component={ListScreen} options={{ title: 'Mascotas Abandonadas' }} />
      <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Reportar Mascota' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalles del Rescate' }} />
      <Stack.Screen name="Stats" component={StatsScreen} options={{ title: 'Estadísticas' }} />
    </Stack.Navigator>
  );
}