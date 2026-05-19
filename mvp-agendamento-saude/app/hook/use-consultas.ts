"use client";

import { useEffect, useState } from "react";
import { ConsultaService } from "../service/consulta-service";
import { ConsultaInterface } from "../interface/admin-interface";

export function useConsultas() {
  const consultaService = new ConsultaService();
  const [consultas, setConsultas] = useState<ConsultaInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar todas as consultas
  async function carregarConsultas() {
    try {
      setLoading(true);
      setError(null);
      const data = await consultaService.getAll();
      setConsultas(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar consultas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Adicionar nova consulta
  async function adicionarConsulta(data: ConsultaInterface) {
    try {
      setError(null);
      const novaConsulta = await consultaService.create(data);
      // Recarrega a lista para garantir sincronia
      await carregarConsultas();
      return novaConsulta;
    } catch (err: any) {
      setError(err.message || "Erro ao adicionar consulta");
      throw err;
    }
  }

  // Editar consulta existente
  async function editarConsulta(id: string, data: Partial<ConsultaInterface>) {
    try {
      setError(null);
      const consultaAtualizada = await consultaService.update(id, data);
      // Atualiza localmente sem recarregar tudo (otimização)
      setConsultas(prev =>
        prev.map(c => (c.id === id ? { ...c, ...consultaAtualizada } : c))
      );
      return consultaAtualizada;
    } catch (err: any) {
      setError(err.message || "Erro ao editar consulta");
      throw err;
    }
  }

  // Excluir consulta
  async function excluirConsulta(id: string) {
    try {
      setError(null);
      await consultaService.delete(id);
      // Remove localmente
      setConsultas(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      setError(err.message || "Erro ao excluir consulta");
      throw err;
    }
  }

  // Recarregar manualmente
  async function recarregarConsultas() {
    await carregarConsultas();
  }

  useEffect(() => {
    carregarConsultas();
  }, []);

  return {
    consultas,
    loading,
    error,
    adicionarConsulta,
    editarConsulta,
    excluirConsulta,
    recarregarConsultas,
  };
}