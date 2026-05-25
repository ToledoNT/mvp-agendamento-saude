export interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  email: string;
}

export type MedicoInput = Omit<Medico, 'id'>;

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data: T;
};

const API_BASE = '/api/medicos';

export const medicoService = {
  async listar(): Promise<Medico[]> {
    const response = await fetch(API_BASE);

    if (!response.ok) {
      throw new Error('Erro ao carregar médicos');
    }

    const json: ApiResponse<Medico[]> = await response.json();

    return Array.isArray(json.data) ? json.data : [];
  },

  async criar(data: MedicoInput): Promise<Medico> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar médico');
    }

    const json: ApiResponse<Medico> = await response.json();

    return json.data;
  },
};