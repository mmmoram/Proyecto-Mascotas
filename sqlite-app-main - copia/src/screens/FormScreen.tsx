import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/typesNavigation';
import { petService } from '../services/petService';
import { appStyles } from '../styles/appStyles';

type Props = { navigation: StackNavigationProp<RootStackParamList, 'Form'> };

export default function FormScreen({ navigation }: Props) {
  const [tipo, setTipo] = useState('');
  const [raza, setRaza] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  
  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const handleAutoAnalyze = async () => {
    if (!fotoUri) {
      Alert.alert("Atención", "Primero sube una foto para que la IA la analice.");
      return;
    }
    setLoadingAi(true);
    try {
      const result = await petService.analyzeImageWithAI(fotoUri);
      setTipo(result.tipo);
      setRaza(result.raza);
      Alert.alert("Éxito", "La IA ha detectado la especie y raza.");
    } catch (error) {
      Alert.alert("Error", "Fallo la conexión con IA.");
    } finally {
      setLoadingAi(false);
    }
  };

  const handleSave = async () => {

    if (tipo.trim().length < 3 || ubicacion.trim().length < 5) {
      Alert.alert("Aviso", "Por favor ingresa datos reales y detallados en Tipo y Ubicación.");
      return;
    }
    
    try {
      const fechaActual = new Date().toISOString().split('T')[0];
      await petService.addPet({
        tipo,
        raza: raza || 'Mestizo / Desconocida',
        ubicacion,
        estado: 'En la calle',
        // no es obligatorio la foto 
        foto: fotoUri || 'sin_foto', 
        fecha: fechaActual
      });
      Alert.alert("Guardado", "Reporte registrado correctamente.");
      navigation.goBack();
    } catch (error: any) {
      console.error("Error SQL:", error);
      Alert.alert("Error Técnico", `Detalle: ${error.message || "Error desconocido al guardar"}`);
    }
  };

  return (
    <ScrollView style={appStyles.container}keyboardShouldPersistTaps="handled">
    
      <Text style={appStyles.title}>Datos del Rescate</Text>

      {/*-------------FOTOGRAFÍA----------- */}
      <View style={{ alignItems: 'center', marginBottom: 15 }}>
        {fotoUri ? (
          <Image source={{ uri: fotoUri }} style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 10 }} />
        ) : (
          <View style={{ width: '100%', height: 150, backgroundColor: '#E5E7EB', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ color: '#6B7280' }}>Sin fotografía</Text>
          </View>
        )}
        <TouchableOpacity style={[appStyles.buttonPrimary, { width: '100%', backgroundColor: '#6366F1' }]} onPress={seleccionarImagen}>
          <Text style={appStyles.buttonText}>📷 Adjuntar Fotografía</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={appStyles.buttonPrimary} onPress={handleAutoAnalyze}>
        <Text style={appStyles.buttonText}>🧠 Autocompletar con IA</Text>
      </TouchableOpacity>
      {loadingAi && <ActivityIndicator size="large" color="#0EA5E9" style={{ marginVertical: 10 }} />}

      <TextInput style={appStyles.input} placeholder="Tipo (ej. Gato, Perro)" placeholderTextColor="#999" value={tipo} onChangeText={setTipo} />
      <TextInput style={appStyles.input} placeholder="Raza" placeholderTextColor="#999" value={raza} onChangeText={setRaza} />
      <TextInput style={appStyles.input} placeholder="Ubicación exacta" placeholderTextColor="#999" value={ubicacion} onChangeText={setUbicacion} />

      <TouchableOpacity style={[appStyles.buttonSuccess, { marginBottom: 40 }]} onPress={handleSave}>
        <Text style={appStyles.buttonText}>Guardar Reporte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}