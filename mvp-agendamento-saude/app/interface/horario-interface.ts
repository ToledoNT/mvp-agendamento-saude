export interface CreateHorarioData {
  horario: string;
  medico: string;
  data: string;
}

export interface Horario {
  id: string;
  medico: string;
  data: string;
  horario: string;
  createdAt?: string; 
}
export interface HorarioResponse {
  status: boolean;
  code: number;
  message: string;
  data: Horario[];
}