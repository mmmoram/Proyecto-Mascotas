import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../screens/ListScreen';
import FormScreen from '../screens/FormScreen';
import DetailScreen from '../screens/DetailScreen';
import StatsScreen from '../screens/StatsScreen';
import { RootStackParamList } from './typesNavigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={ListScreen} options={{ title: 'Mascotas Abandonadas' }} />
      <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Reportar MascotA_prueba1' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalles del Rescate' }} />
      <Stack.Screen name="Stats" component={StatsScreen} options={{ title: 'Estadísticas' }} />
    </Stack.Navigator>
  );
}