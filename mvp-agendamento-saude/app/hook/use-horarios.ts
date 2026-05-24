'use client';

import { useState } from 'react';
import { horarioService } from '../service/horario-service';
import {
  Horario,
  CreateHorarioData,
} from '../interface/horario-interface';

export function useHorarios() {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(false);

  async function createHorarios(data: CreateHorarioData[]) {
    try {
      setLoading(true);

      await horarioService.createMany(data);

      setHorarios((prev) => [
        ...prev,
        ...data.map((item, index) => ({
          id: `${Date.now()}-${index}`,
          horario: item.horario,
          medico: item.medico,
          data: item.data,
        })),
      ]);
    } catch (error) {
      console.error('Erro ao criar horários:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function getHorarios() {
    try {
      setLoading(true);

      const response = await horarioService.getAll();

      setHorarios(response?.data ?? []);

      return response;
    } catch (error) {
      console.error('Erro ao buscar horários:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    horarios,
    loading,
    createHorarios,
    getHorarios,
  };
}