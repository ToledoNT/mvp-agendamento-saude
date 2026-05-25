export interface IUpdateAppointment {
  id: string;

  patientName?: string;
  email?: string;
  specialty?: string;

  date?: string;
  horario?: string;

  status?: string;
}