import { useState, useEffect, useCallback } from 'react';
import { Medico, MedicoInput, medicoService } from '../service/medico-service';

export function useMedicos() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMedicos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const lista = await medicoService.listar();
      setMedicos(Array.isArray(lista) ? lista : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setMedicos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createMedico = useCallback(async (data: MedicoInput) => {
    setLoading(true);
    setError(null);

    try {
      const novoMedico = await medicoService.criar(data);

      setMedicos((prev) => {
        if (!Array.isArray(prev)) return [novoMedico];
        return [...prev, novoMedico];
      });

      return novoMedico;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar médico');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMedico = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await fetch(`/api/medicos/${id}`, {
        method: 'DELETE',
      });

      setMedicos((prev) =>
        Array.isArray(prev) ? prev.filter((m) => m.id !== id) : []
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar médico');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMedicos();
  }, [loadMedicos]);

  return {
    medicos,
    loading,
    error,
    loadMedicos,
    createMedico,
    deleteMedico,
  };
}