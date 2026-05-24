import { CreateHorarioData, HorarioResponse } from "../interface/horario-interface";

const API_URL = '/api/horarios';

export const horarioService = {
  async createMany(
    data: CreateHorarioData[]
  ): Promise<HorarioResponse> {
    const response = await fetch(
      API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(
        'Erro ao criar horários'
      );
    }

    return response.json();
  },

  async getAll(): Promise<HorarioResponse> {
    const response = await fetch(
      API_URL
    );

    if (!response.ok) {
      throw new Error(
        'Erro ao buscar horários'
      );
    }

    return response.json();
  },
};