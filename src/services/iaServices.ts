import { GoogleGenerativeAI } from "@google/generative-ai";
import { AiAnalysisResult } from "../types/pet";
import { GEMINI_API_KEY } from "../config/apiConfig";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const analyzePetImage = async (base64Image: string): Promise<AiAnalysisResult> => {
  console.log("Iniciando análisis de imagen con Gemini...");
  console.log("Longitud de base64:", base64Image.length);
  
  if (!GEMINI_API_KEY || GEMINI_API_KEY.includes("PEGA_AQUI")) {
    throw new Error("LA_CLAVE_API_ES_INVALIDA");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `Analiza esta imagen de un animal. Eres un experto veterinario. Devuelve EXCLUSIVAMENTE un objeto JSON válido con la siguiente estructura, sin formato markdown, sin comillas invertidas y sin texto extra:
  {
    "species": "Perro" o "Gato" o "Otro",
    "breed": "Raza aproximada o Mestizo",
    "physicalState": "Breve descripción del estado físico (ej. Desnutrido, Herido, Saludable)"
  }`;

  const imageParts = [
    {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg"
      }
    }
  ];

  try {
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log("Respuesta bruta de Gemini:", text);
    
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText) as AiAnalysisResult;
  } catch (error: any) {
    console.error("DETALLE DE ERROR GEMINI:", JSON.stringify(error, null, 2));
    console.error("MENSAJE DE ERROR:", error.message);
    
    if (error.message?.includes("API key not valid") || error.status === 400) {
      // Si el usuario dice que es correcta, puede ser un problema de cuotas o región que se reporta como 400
      throw new Error("LA_CLAVE_API_ES_INVALIDA");
    }
    
    throw new Error(`Error Gemini: ${error.message || 'Fallo desconocido'}`);
  }
};