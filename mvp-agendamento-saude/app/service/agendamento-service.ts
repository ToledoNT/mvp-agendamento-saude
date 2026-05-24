import { ConsultaInterface } from "../interface/admin-interface";

export class AgendamentoService {
  async create(data: ConsultaInterface) {
    const response = await fetch("/api/agendamento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Erro ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  }

  async getHorariosByMedico(medicoId: string) {
    const response = await fetch(
      `/api/medicos/${medicoId}/horarios`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Erro ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  }
}