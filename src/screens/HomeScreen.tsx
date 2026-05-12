import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/typesNavigation';
import { petService } from '../services/petService';
import { initDatabase } from '../database/database';
import { appStyles } from '../styles/appStyles';

type Props = { navigation: StackNavigationProp<RootStackParamList, 'Home'> };

export default function HomeScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, enCalle: 0, rescatadas: 0, fundacion: 0, adoptadas: 0 });

useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const loadStats = async () => {
        setLoading(true);
        
        await initDatabase(); 
        
        const data = await petService.getPets();
        if (isActive) {
          setStats({
            total: data.length,
            enCalle: data.filter(p => p.estado === 'En la calle').length,
            rescatadas: data.filter(p => p.estado === 'Rescatada').length,
            fundacion: data.filter(p => p.estado === 'Recogida por Fundación').length,
            adoptadas: data.filter(p => p.estado === 'Adoptada').length,
          });
          setLoading(false);
        }
      };
      loadStats();
      return () => { isActive = false; };
    }, [])
  );

  return (
    <ScrollView style={appStyles.container}>
      
      {/* 1. Cabecera, Avatar y Texto */}
      <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 25 }}>
      
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400&auto=format&fit=crop' }}
          style={{ width: 140, height: 140, borderRadius: 70, marginBottom: 15, borderWidth: 3, borderColor: '#0EA5E9' }}
        />
        
        <Text style={[appStyles.title, { textAlign: 'center', fontSize: 26, color: '#1F2937' }]}>
          Red de Rescate Animal
        </Text>
        
        <Text style={[appStyles.textSecondary, { textAlign: 'center', paddingHorizontal: 10, marginTop: 8, lineHeight: 22, fontSize: 15 }]}>
          Esta herramienta solidaria permite a la comunidad de Quito reportar mascotas en situación de abandono. Juntos podemos facilitar su rescate, organizar a las fundaciones y darles una segunda oportunidad!
        </Text>
      </View>

      {/* BotónPrincipal */}
      <TouchableOpacity
        style={[appStyles.buttonPrimary, { backgroundColor: '#6366F1', paddingVertical: 18, marginBottom: 35, elevation: 4 }]}
        onPress={() => navigation.navigate('List')}
      >
        <Text style={[appStyles.buttonText, { fontSize: 18 }]}>🐶🐱Módulo de Reportes</Text>
      </TouchableOpacity>

    
      <View style={{ paddingBottom: 30 }}>
        <Text style={[appStyles.title, { fontSize: 18, marginBottom: 15 }]}>Impacto Actual</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#0EA5E9" />
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            
            <View style={[appStyles.card, { width: '100%', backgroundColor: '#0EA5E9', alignItems: 'center' }]}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Total de Registros</Text>
              <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold' }}>{stats.total}</Text>
            </View>

            <View style={[appStyles.card, { width: '48%', borderTopWidth: 4, borderTopColor: '#EF4444', padding: 12 }]}>
              <Text style={appStyles.textSecondary}>En la calle</Text>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#EF4444' }}>{stats.enCalle}</Text>
            </View>

            <View style={[appStyles.card, { width: '48%', borderTopWidth: 4, borderTopColor: '#10B981', padding: 12 }]}>
              <Text style={appStyles.textSecondary}>Rescatadas</Text>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#10B981' }}>{stats.rescatadas}</Text>
            </View>

            <View style={[appStyles.card, 
              { 
                width: '48%', 
                borderTopWidth: 4, 
                borderTopColor: '#F59E0B', padding: 12 }]}>
              <Text style={appStyles.textSecondary}>En Fundación</Text>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#F59E0B' }}>{stats.fundacion}</Text>
            </View>

            <View style={[appStyles.card, { width: '48%', borderTopWidth: 4, borderTopColor: '#8B5CF6', padding: 12 }]}>
              <Text style={appStyles.textSecondary}>Adoptadas</Text>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#8B5CF6' }}>{stats.adoptadas}</Text>
            </View>
            
          </View>
        )}
      </View>
    </ScrollView>
  );
}