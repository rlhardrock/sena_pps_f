export interface User {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  rol: string;
  estado: boolean;
  created_at?: Date;
  updated_at?: Date;
}
