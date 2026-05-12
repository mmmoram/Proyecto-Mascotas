import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ScrollView, TextInput } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/typesNavigation';
import { petService } from '../services/petService';
import { appStyles } from '../styles/appStyles';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type Props = { route: DetailRouteProp; navigation: StackNavigationProp<RootStackParamList, 'Detail'>; };

export default function DetailScreen({ route, navigation }: Props) {
  const { pet } = route.params;
  const [estadoActual, setEstadoActual] = useState(pet.estado);
  const [infoExtra, setInfoExtra] = useState(pet.observaciones || '');  

  const handleActualizarEstado = async (nuevoEstado: string) => {
     
    if (infoExtra.trim().length < 5) {
      Alert.alert("Información requerida", "Por favor ingresa detalles sobre el cambio (quién lo lleva, qué fundación, etc.)");
      return;
    }

    try {
       
      await petService.updatePetStatus(pet.id!, nuevoEstado, infoExtra);
      setEstadoActual(nuevoEstado);
      Alert.alert("Actualizado", `Mascota marcada como: ${nuevoEstado}`);
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el estado.");
    }
  };

  const handleEliminar = async () => {
    try {
      await petService.deletePet(pet.id!);
      Alert.alert("Eliminado", "El reporte ha sido borrado.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el reporte.");
    }
  };

  return (
    <ScrollView 
      style={appStyles.container} 
      keyboardShouldPersistTaps="handled" 
    >
      <View style={appStyles.card}>
        {pet.foto && pet.foto !== 'sin_foto' ? (
          <Image source={{ uri: pet.foto }} style={{ width: '100%', height: 250, borderRadius: 8, marginBottom: 15 }} />
        ) : null}
        
        <Text style={appStyles.title}>{pet.tipo} ({pet.raza})</Text>
        <Text style={appStyles.textSecondary}>📍 Ubicación: {pet.ubicacion}</Text>
        <Text style={appStyles.textSecondary}>📅 Reportado: {pet.fecha}</Text>
        <Text style={[appStyles.textSecondary, { marginTop: 15, fontSize: 16, fontWeight: 'bold' }]}>
          Estado actual: <Text style={appStyles.statusBadge}>{estadoActual}</Text>
        </Text>

        {pet.observaciones || infoExtra ? (
          <Text style={[appStyles.textSecondary, { fontStyle: 'italic', marginTop: 10, color: '#4B5563' }]}>
            📝 Notas: {infoExtra || pet.observaciones}
          </Text>
        ) : null}
      </View>

      <View style={{ marginTop: 10, marginBottom: 40 }}>
        <Text style={[appStyles.textSecondary, { marginBottom: 10, textAlign: 'center' }]}>Cambiar estado de la mascota:</Text>

       
        <Text style={[appStyles.textSecondary, { marginBottom: 5 }]}>Información de seguimiento:</Text>
        <TextInput
          style={[appStyles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Ej: Llevado por Juan Pérez a Fundación 'Huellitas'"
          multiline
          value={infoExtra}
          onChangeText={setInfoExtra}
        />

        {estadoActual === 'En la calle' && (
          <>
            <TouchableOpacity style={appStyles.buttonSuccess} onPress={() => handleActualizarEstado('Rescatada')}>
              <Text style={appStyles.buttonText}>🏠 Marcar como Rescatada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[appStyles.buttonPrimary, { backgroundColor: '#F59E0B' }]} onPress={() => handleActualizarEstado('Recogida por Fundación')}>
              <Text style={appStyles.buttonText}>🏢 Recogida por Fundación</Text>
            </TouchableOpacity>
          </>
        )}

        {(estadoActual === 'Rescatada' || estadoActual === 'Recogida por Fundación') && (
          <TouchableOpacity style={[appStyles.buttonPrimary, { backgroundColor: '#8B5CF6' }]} onPress={() => handleActualizarEstado('Adoptada')}>
            <Text style={appStyles.buttonText}>❤️ Marcar como Adoptada</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[appStyles.buttonDanger, { marginTop: 30 }]} onPress={handleEliminar}>
          <Text style={appStyles.buttonText}>🗑️ Eliminar Reporte</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}