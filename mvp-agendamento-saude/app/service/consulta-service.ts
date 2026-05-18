import { ConsultaInterface } from "../interface/admin-interface";

export class ConsultaService {
  async getAll(): Promise<ConsultaInterface[]> {
    const response = await fetch(
      "http://localhost:3001/consultas"
    );

    return await response.json();
  }

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

  async update(
    id: string,
    data: Partial<ConsultaInterface>
  ) {
    const response = await fetch(
      `http://localhost:3001/consultas/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return await response.json();
  }

  async delete(id: string) {
    const response = await fetch(
      `http://localhost:3001/consultas/${id}`,
      {
        method: "DELETE",
      }
    );

    return await response.json();
  }
}