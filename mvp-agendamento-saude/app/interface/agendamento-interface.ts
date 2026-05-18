export interface Props {
  nome: string;
  medico: string;
  horario: string;

  loading: boolean;

  setNome: (value: string) => void;
  setMedico: (value: string) => void;
  setHorario: (value: string) => void;

  onSubmit: (
    e: React.FormEvent
  ) => void;

  styles: any;
}