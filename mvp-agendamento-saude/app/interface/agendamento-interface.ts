export interface Props {
  nome: string;
  email: string;
  especialidade: string;
  medico: string;
  data: string;
  horario: string;
  loading: boolean;

  setNome: (value: string) => void;
  setEmail: (value: string) => void;
  setEspecialidade: (value: string) => void;
  setMedico: (value: string) => void;
  setData: (value: string) => void;
  setHorario: (value: string) => void;

  onSubmit: (e: React.FormEvent) => void;

  styles: any;

  // 🔥 ADICIONA ISSO AQUI
  horariosDisponiveis: string[];
}