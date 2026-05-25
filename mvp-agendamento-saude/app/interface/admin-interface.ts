export interface ConsultaInterface {
  id?: string; // 👈 adiciona isso
  nome: string;
  email: string;

  medico: string; 
  specialty: string; 

  date: string;
  time: string;

  status: "AGENDADO" | "CANCELADO" | "CONCLUIDO";
}