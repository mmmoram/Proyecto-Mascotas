import { StyleSheet } from 'react-native';

export const appStyles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F3F4F6' },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 3 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  
  // Forzamos el color negro para evitar que se ponga blanco en Modo Oscuro
  textPrimary: { fontSize: 16, fontWeight: 'bold', color: '#000000' },
  textSecondary: { fontSize: 14, color: '#333333', marginTop: 4 },
  
  statusBadge: { color: '#EF4444', fontWeight: 'bold' },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 6, padding: 12, marginBottom: 12, color: '#000000' },
  
  // Botones
  buttonPrimary: { backgroundColor: '#0EA5E9', padding: 15, borderRadius: 6, alignItems: 'center', marginVertical: 8 },
  buttonSuccess: { backgroundColor: '#10B981', padding: 15, borderRadius: 6, alignItems: 'center', marginVertical: 8 },
  
  // ¡Aquí está el estilo que faltaba para el botón de eliminar!
  buttonDanger: { backgroundColor: '#EF4444', padding: 15, borderRadius: 6, alignItems: 'center', marginVertical: 8 },
  
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  emptyText: { textAlign: 'center', marginTop: 30, color: '#6B7280', fontSize: 16 }
});