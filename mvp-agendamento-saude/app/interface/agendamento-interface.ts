export interface Props {
  nome: string;
  email: string;
  especialidade: string;
  data: string;
  horario: string;
  loading: boolean;
  setNome: (value: string) => void;
  setEmail: (value: string) => void;
  setEspecialidade: (value: string) => void;
  setData: (value: string) => void;
  setHorario: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  styles: any;
}