"use client";

import { useEffect, useState } from "react";


import { ConsultaService } from "../service/consulta-service";
import { ConsultaInterface } from "../interface/admin-interface";

export function useConsultas() {
  const consultaService = new ConsultaService();

  const [consultas, setConsultas] = useState<
    ConsultaInterface[]
  >([]);

  async function carregarConsultas() {
    const response =
      await consultaService.getAll();

    setConsultas(response);
  }

  async function adicionarConsulta(
    data: ConsultaInterface
  ) {
    const response =
      await consultaService.create(data);

    setConsultas(response);
  }

  async function editarConsulta(
    id: string,
    data: Partial<ConsultaInterface>
  ) {
    const response =
      await consultaService.update(id, data);

    setConsultas(response);
  }

  async function excluirConsulta(id: string) {
    const response =
      await consultaService.delete(id);

    setConsultas(response);
  }

  useEffect(() => {
    carregarConsultas();
  }, []);

  return {
    consultas,
    adicionarConsulta,
    editarConsulta,
    excluirConsulta,
  };
}