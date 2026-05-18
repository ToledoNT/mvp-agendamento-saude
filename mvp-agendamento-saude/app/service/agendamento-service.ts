import { ConsultaInterface } from "../interface/admin-interface";

export class AgendamentoService {
  async create(data: ConsultaInterface) {
    const response = await fetch(
      "http://localhost:3001/consultas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return await response.json();
  }
}