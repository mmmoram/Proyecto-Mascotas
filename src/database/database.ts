import * as SQLite from 'expo-sqlite';

let dbInstance: SQLite.SQLiteDatabase | null = null;
let isInitializing = false; 

export const getDB = async () => {
  if (dbInstance) return dbInstance;
  
  while (isInitializing) {
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  if (!dbInstance) {
    isInitializing = true;
    try {
      
      dbInstance = await SQLite.openDatabaseAsync('mascotas_v5.db');
    } finally {
      isInitializing = false;
    }
  }
  return dbInstance;
};

export const initDatabase = async () => {
  try {
    const db = await getDB();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS mascotas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        raza TEXT,
        ubicacion TEXT,
        estado TEXT,
        foto TEXT,
        fecha TEXT,
        observaciones TEXT 
      );
    `);
    console.log(" Base de datos ok");
  } catch (error) {
    console.error("Error al crear DB:", error);
  }
};