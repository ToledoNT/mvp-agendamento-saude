export interface ConsultaInterface {
  id: string;
  patientName: string;  
  email: string;
  specialty: string;    
  date: string;
  time: string;        
  status: "Agendado" | "Cancelado" | "Concluído";
  createdAt: string;
}