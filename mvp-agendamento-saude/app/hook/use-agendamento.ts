"use client";

import { useState, useCallback } from "react";

import { ConsultaInterface } from "../interface/admin-interface";
import { AgendamentoService } from "../service/agendamento-service";
import { horarioService } from "../service/horario-service";
import { Horario } from "../interface/horario-interface";

export function useAgendamento() {
  const agendamentoService = new AgendamentoService();

  const [loading, setLoading] = useState(false);
  const [horarios, setHorarios] = useState<Horario[]>([]);

  async function agendarConsulta(data: ConsultaInterface) {
    try {
      setLoading(true);
      return await agendamentoService.create(data);
    } finally {
      setLoading(false);
    }
  }

  const getHorariosPorMedico = useCallback(
    async (medico: string, data?: string) => {
      try {
        setLoading(true);

        const response = await horarioService.getAll();
        const todosHorarios: Horario[] = response?.data ?? [];

  const filtrados = todosHorarios.filter((h) => {
  if (!h?.medico || !h?.horario) return false;

  const matchMedico = h.medico === medico;

  const matchData =
    !data ||
    h.data?.substring(0, 10) === data;

  return matchMedico && matchData;
});

        setHorarios(filtrados);
        return filtrados;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    agendarConsulta,
    getHorariosPorMedico,
    horarios,
    loading,
  };
}