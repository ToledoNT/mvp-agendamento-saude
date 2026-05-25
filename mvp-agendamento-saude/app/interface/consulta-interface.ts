export interface ConsultaInterface {
  id?: string;

  nome: string;
  email: string;

  medico: string;
  specialty: string;

  date: string;
  horario: string; // ✅ padronizado (antes era time)

  status: "AGENDADO" | "CANCELADO" | "CONCLUIDO";
}