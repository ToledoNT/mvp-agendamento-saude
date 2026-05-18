export interface ConsultaInterface {
  id: string;

  nome: string;

  medico: string;

  horario: string;

  status: "Agendado" | "Cancelado" | "Concluído";
}