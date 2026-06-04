import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  Alert, 
  ImageBackground, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/typesNavigation';
import { appStyles, COLORS } from '../styles/appStyles';

const { width, height } = Dimensions.get('window');
const fondoLogin = require('../../assets/imagen_login.png');

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
    <ImageBackground
      source={fondoLogin}
      style={{ flex: 1, width: width, height: height }}
      resizeMode="cover"
    >
      {/* Capa semitransparente para mejor legibilidad de los botones */}
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ 
            flex: 1, 
            justifyContent: 'center',  // Centra los botones verticalmente
            paddingHorizontal: 32,
          }}>
            
            {/* Solo botones en el centro - SIN TÍTULO NI SUBTÍTULO */}
            <View style={{ gap: 14 }}>
              
              {/* Botón Google */}
              <TouchableOpacity 
                style={{
                  backgroundColor: '#FFFFFF',
                  paddingVertical: 16,
                  borderRadius: 12,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 5,
                }}
                onPress={handleGoogleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.primary} />
                ) : (
                  <>
                    <Image 
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} 
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={{
                      color: '#333333',
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                      Continuar con Google
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Botón Invitado */}
              <TouchableOpacity 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  paddingVertical: 16,
                  borderRadius: 12,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                }}
                onPress={handleGuestLogin}
              >
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                  Entrar como invitado
                </Text>
              </TouchableOpacity>

              {/* Enlace ayuda */}
              <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={{ 
                  textAlign: 'center', 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontSize: 14, 
                  fontWeight: '500',
                }}>
                  ¿Necesitas ayuda?{' '}
                  <Text style={{ color: '#FFB347', fontWeight: '600' }}>
                    Contáctanos
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}