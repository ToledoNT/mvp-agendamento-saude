import { ConsultaInterface } from "../interface/consulta-interface";

export class AgendamentoService {
  async create(data: ConsultaInterface) {
    const response = await fetch("/api/agendamento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        result.message ||
          `Erro ${response.status}: ${response.statusText}`
      );
    }

    return result;
  }

  async getHorariosByMedico(medico: string, data?: string) {
    const url = new URL(
      `/api/medicos/${medico}/horarios`,
      window.location.origin
    );

    if (data) {
      url.searchParams.append("data", data);
    }

    const response = await fetch(url.toString());

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        result.message ||
          `Erro ${response.status}: ${response.statusText}`
      );
    }

    return result;
  }
}