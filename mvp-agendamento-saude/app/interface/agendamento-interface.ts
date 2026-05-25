import { Medico } from "../service/medico-service";
import { Horario } from "../interface/horario-interface";

export interface Props {
  nome: string;
  email: string;

  medico: string; // 👈 agora é ID do médico (string)
  especialidade: string;

  data: string;
  horario: string;

  medicosDisponiveis: Medico[];
  horariosDisponiveis: Horario[];

  loading: boolean;

  setNome: (v: string) => void;
  setEmail: (v: string) => void;

  setMedico: (v: string) => void;
  setEspecialidade: (v: string) => void;

  setData: (v: string) => void;
  setHorario: (v: string) => void;

  onSubmit: (e: React.FormEvent) => void;

  styles: any;
}