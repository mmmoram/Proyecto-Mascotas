import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, NavigationProps } from '../navigation/typesNavigation';
import { appStyles, COLORS } from '../styles/appStyles';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from '../config/apiConfig';

type ShelterScreenRouteProp = RouteProp<RootStackParamList, 'Shelters'>;

export default function ShelterScreen() {
  const route = useRoute<ShelterScreenRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  const { city } = route.params || { city: 'Cuenca' };

  const [recommendations, setRecommendations] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShelters = async () => {
      if (!GEMINI_API_KEY || GEMINI_API_KEY.includes("TU_API_KEY")) {
        setRecommendations("⚠️ Configuración incompleta:\n\nDebes obtener una API Key en aistudio.google.com y pegarla en el archivo 'src/config/apiConfig.ts' para usar el asistente.");
        setLoading(false);
        return;
      }

      try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Actúa como un experto veterinario y rescatista. El usuario está en ${city}, Ecuador.
        1. Enumera las 3 fundaciones de rescate animal más importantes de esa ciudad con su nombre real.
        2. Proporciona una recomendación de seguridad para alguien que acaba de encontrar un animal herido.
        Usa emojis y un tono amable y profesional.`;
        
        const result = await model.generateContent(prompt);
        setRecommendations(result.response.text());
      } catch (error: any) {
        console.error("AI Error:", error);
        setRecommendations("❌ No pudimos obtener la información. Verifica tu conexión o la validez de tu API Key en aistudio.google.com");
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, [city]);

  return (
    <SafeAreaView style={appStyles.container}>
      <ScrollView contentContainerStyle={appStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={appStyles.subtitle}>Buscando red de apoyo en: {city}</Text>

        <View style={[appStyles.card, { padding: 24 }]}>
          {loading ? (
            <View style={{ padding: 40, alignItems: 'center' }}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={{ marginTop: 16, color: COLORS.textSecondary, textAlign: 'center' }}>Gemini está buscando refugios cercanos...</Text>
            </View>
          ) : (
            <Text style={{ fontSize: 16, color: COLORS.textPrimary, lineHeight: 28 }}>
              {recommendations}
            </Text>
          )}
        </View>

        {!loading && (
          <TouchableOpacity 
            style={appStyles.buttonSecondary}
            onPress={() => navigation.goBack()}
          >
            <Text style={appStyles.buttonTextSecondary}>Volver al Inicio</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}