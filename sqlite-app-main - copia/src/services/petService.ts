import { getDB } from '../database/database';
import { Pet } from '../types/pet';

export const petService = {
  addPet: async (pet: Pet): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
      'INSERT INTO mascotas (tipo, raza, ubicacion, estado, foto, fecha, observaciones) VALUES ($tipo, $raza, $ubicacion, $estado, $foto, $fecha, $obs)',
      {
        $tipo: pet.tipo || '',
        $raza: pet.raza || 'Mestizo / Desconocida',
        $ubicacion: pet.ubicacion || '',
        $estado: pet.estado || 'En la calle',
        $foto: pet.foto || 'sin_foto',
        $fecha: pet.fecha || new Date().toISOString().split('T')[0],
        $obs: pet.observaciones || ''
      }
    );
  },

  getPets: async (): Promise<Pet[]> => {
    try {
      const db = await getDB();
      const result = await db.getAllAsync('SELECT * FROM mascotas ORDER BY id DESC') as any[];
      return result.map(row => ({
        id: row.id,
        tipo: row.tipo,
        raza: row.raza,
        ubicacion: row.ubicacion,
        estado: row.estado,
        foto: row.foto,
        fecha: row.fecha,
        observaciones: row.observaciones 
      }));
    } catch (error) {
      console.error("Error obteniendo mascotas:", error);
      return [];
    }
  },

  
  updatePetStatus: async (id: number, nuevoEstado: string, infoExtra: string): Promise<void> => {
    if (!id) throw new Error("ID inválido");
    const db = await getDB();
    await db.runAsync(
      'UPDATE mascotas SET estado = $estado, observaciones = $obs WHERE id = $id',
      {
        $estado: nuevoEstado,
        $obs: infoExtra,
        $id: id
      }
    );
  },

  deletePet: async (id: number): Promise<void> => {
    if (!id) throw new Error("ID inválido");
    const db = await getDB();
    await db.runAsync('DELETE FROM mascotas WHERE id = $id', { $id: id });
  },

  analyzeImageWithAI: async (photoUri: string): Promise<{ tipo: string, raza: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ tipo: 'Perro', raza: 'Mestizo / Callejero' }); }, 1500); 
    });
  }
};