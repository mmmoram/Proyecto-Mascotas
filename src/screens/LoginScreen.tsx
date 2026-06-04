import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/typesNavigation';
import { appStyles, COLORS } from '../styles/appStyles';
// import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'; // Descomentar para Auth real

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        setIsLoading(false);
        navigation.replace('Home');
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'No se pudo iniciar sesión con Google.');
    }
  };

  const handleGuestLogin = () => {
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={[appStyles.container, { backgroundColor: COLORS.white }]}>
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 32 }}>
        <View style={{ alignItems: 'center', marginBottom: 60 }}>
          <View style={{ 
            width: 200, height: 200, backgroundColor: COLORS.primaryLight, 
            borderRadius: 100, justifyContent: 'center', alignItems: 'center',
            shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.15, shadowRadius: 30, elevation: 10,
          }}>
            <Image 
              source={{ uri: 'https://img.freepik.com/vector-premium/logo-animal-mascotas-perro-gato-geometrico_649646-1050.jpg' }} 
              style={{ width: 160, height: 160, borderRadius: 80 }}
              resizeMode="contain"
            />
          </View>
          <Text style={[appStyles.title, { marginTop: 40, textAlign: 'center' }]}>
            Huellas a Salvo
          </Text>
          <Text style={[appStyles.subtitle, { marginTop: 16, textAlign: 'center', paddingHorizontal: 20 }]}>
            La red colaborativa de rescate animal más grande y moderna.
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <TouchableOpacity 
            style={appStyles.buttonPrimary}
            onPress={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} 
                  style={{ width: 24, height: 24 }}
                />
                <Text style={appStyles.buttonText}>
                  Continuar con Google
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={appStyles.buttonSecondary}
            onPress={handleGuestLogin}
          >
            <Text style={appStyles.buttonTextSecondary}>
              Entrar como invitado
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ marginTop: 40 }}>
          <Text style={{ textAlign: 'center', color: COLORS.textSecondary, fontSize: 14, fontWeight: '600' }}>
            ¿Necesitas ayuda? <Text style={{ color: COLORS.primary }}>Contáctanos</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}