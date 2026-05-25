export interface IUpdateAppointment {
  id: string;

  patientName?: string;
  email?: string;
  specialty?: string;

  date?: string;
  time?: string;

  status?: string;
}