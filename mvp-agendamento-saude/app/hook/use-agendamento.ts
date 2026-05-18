"use client";

import { useState } from "react";

import { ConsultaInterface } from "../interface/admin-interface";
import { AgendamentoService } from "../service/agendamento-service";


export function useAgendamento() {
  const agendamentoService =
    new AgendamentoService();

  const [loading, setLoading] =
    useState(false);

  async function agendarConsulta(
    data: ConsultaInterface
  ) {
    try {
      setLoading(true);

      const response =
        await agendamentoService.create(data);

      return response;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    agendarConsulta,
  };
}