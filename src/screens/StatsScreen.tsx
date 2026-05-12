import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/typesNavigation';
import { petService } from '../services/petService';
import { appStyles } from '../styles/appStyles';
import { Pet } from '../types/pet'; 

type Props = { navigation: StackNavigationProp<RootStackParamList, 'Stats'> };

export default function StatsScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [allPets, setAllPets] = useState<Pet[]>([]); // Guardamos TODA la base de datos aquí
  const [filtroActivo, setFiltroActivo] = useState<string | null>(null); // Controla qué lista se muestra

  const [stats, setStats] = useState({
    total: 0,
    enCalle: 0,
    rescatadas: 0,
    fundacion: 0,
    adoptadas: 0
  });

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadStats = async () => {
        setLoading(true);
        const data = await petService.getPets();
        
        if (isActive) {
          setAllPets(data); // Almacenamos los datos para poder filtrarlos sin volver a la DB
          const conteo = {
            total: data.length,
            enCalle: data.filter(p => p.estado === 'En la calle').length,
            rescatadas: data.filter(p => p.estado === 'Rescatada').length,
            fundacion: data.filter(p => p.estado === 'Recogida por Fundación').length,
            adoptadas: data.filter(p => p.estado === 'Adoptada').length,
          };
          setStats(conteo);
          setLoading(false);
        }
      };

      loadStats();
      return () => { isActive = false; };
    }, [])
  );

  // Filtramos la lista en tiempo real según la tarjeta que toques
  const mascotasFiltradas = filtroActivo 
    ? allPets.filter(pet => pet.estado === filtroActivo)
    : [];

  if (loading) {
    return <ActivityIndicator size="large" color="#0EA5E9" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <ScrollView style={appStyles.container}>
      <Text style={appStyles.title}>Estadísticas de Impacto</Text>
      
      {/* Tarjeta Total: Al tocarla, limpiamos el filtro y ocultamos la lista */}
      <TouchableOpacity 
        style={[appStyles.card, { backgroundColor: '#0EA5E9', alignItems: 'center' }]}
        onPress={() => setFiltroActivo(null)}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Total de Reportes</Text>
        <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>{stats.total}</Text>
        <Text style={{ color: 'white', fontSize: 12, marginTop: 5 }}>Toca aquí para ocultar listas</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        
        {/* En la calle */}
        <TouchableOpacity 
          style={[appStyles.card, { width: '48%', borderTopWidth: 4, borderTopColor: '#EF4444' }]}
          onPress={() => setFiltroActivo('En la calle')}
        >
          <Text style={appStyles.textSecondary}>En la calle</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#EF4444' }}>{stats.enCalle}</Text>
        </TouchableOpacity>

        {/* Rescatadas */}
        <TouchableOpacity 
          style={[appStyles.card, { width: '48%', borderTopWidth: 4, borderTopColor: '#10B981' }]}
          onPress={() => setFiltroActivo('Rescatada')}
        >
          <Text style={appStyles.textSecondary}>Rescatadas</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#10B981' }}>{stats.rescatadas}</Text>
        </TouchableOpacity>

        {/* En Fundación */}
        <TouchableOpacity 
          style={[appStyles.card, { width: '48%', borderTopWidth: 4, borderTopColor: '#F59E0B' }]}
          onPress={() => setFiltroActivo('Recogida por Fundación')}
        >
          <Text style={appStyles.textSecondary}>En Fundación</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#F59E0B' }}>{stats.fundacion}</Text>
        </TouchableOpacity>

        {/* Adoptadas */}
        <TouchableOpacity 
          style={[appStyles.card, { width: '48%', borderTopWidth: 4, borderTopColor: '#8B5CF6' }]}
          onPress={() => setFiltroActivo('Adoptada')}
        >
          <Text style={appStyles.textSecondary}>Adoptadas</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#8B5CF6' }}>{stats.adoptadas}</Text>
        </TouchableOpacity>

      </View>

      {/* --- NUEVA ZONA: LISTADO DINÁMICO --- */}
      {filtroActivo && (
        <View style={{ marginTop: 20, paddingBottom: 40 }}>
          <Text style={[appStyles.title, { fontSize: 18, marginBottom: 15 }]}>
            Listado: {filtroActivo} ({mascotasFiltradas.length})
          </Text>

          {mascotasFiltradas.length === 0 ? (
            <Text style={appStyles.emptyText}>No hay registros en este estado.</Text>
          ) : (
            mascotasFiltradas.map((pet) => (
              <TouchableOpacity 
                key={pet.id} 
                style={[appStyles.card, { borderLeftWidth: 4, borderLeftColor: '#0EA5E9' }]}
                onPress={() => navigation.navigate('Detail', { pet })}
              >
                <Text style={appStyles.textPrimary}>{pet.tipo} - {pet.raza}</Text>
                <Text style={appStyles.textSecondary}>📍 {pet.ubicacion}</Text>
                <Text style={appStyles.textSecondary}>📅 {pet.fecha}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}