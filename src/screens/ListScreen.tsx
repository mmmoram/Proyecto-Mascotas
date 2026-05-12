import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/typesNavigation';
import { petService } from '../services/petService';
import { initDatabase } from '../database/database';
import { Pet } from '../types/pet';
import { appStyles } from '../styles/appStyles';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'List'>;
};

export default function ListScreen({ navigation }: Props) {
  const [pets, setPets] = useState<Pet[]>([]);

  // Creamos una función asíncrona para cargar
  const loadData = async () => {
    await initDatabase();
    const data = await petService.getPets();
    setPets(data);
  };

  useEffect(() => {
    // Escuchar cuando la pantalla se enfoca para refrescar
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    // Cargar la primera vez
    loadData();
    
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={appStyles.container}>
      <TouchableOpacity 
        style={appStyles.buttonPrimary} 
        onPress={() => navigation.navigate('Form')}
      >
        <Text style={appStyles.buttonText}>+ Registrar Nuevo Abandono</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[appStyles.buttonPrimary, { backgroundColor: '#6366F1', marginTop: 0 }]} 
        onPress={() => navigation.navigate('Stats')}
      >
        <Text style={appStyles.buttonText}>📊 Ver Estadísticas</Text>
      </TouchableOpacity>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={appStyles.card}
            onPress={() => navigation.navigate('Detail', { pet: item })}
          >
            <Text style={appStyles.textPrimary}>{item.tipo} - {item.raza}</Text>
            <Text style={appStyles.textSecondary}>Ubicación: {item.ubicacion}</Text>
            <Text style={appStyles.textSecondary}>
              Estado: <Text style={appStyles.statusBadge}>{item.estado}</Text>
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}