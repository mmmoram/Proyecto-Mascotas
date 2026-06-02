export interface Pet {
  id?: number;
  tipo: string;
  raza: string;
  ubicacion: string;
  estado: string;
  foto: string;
  fecha: string;
  observaciones?: string; 
}