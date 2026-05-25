import { ConsultaInterface } from "../interface/consulta-interface";

export class ConsultaService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `Erro ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
      }
      
      throw new Error(errorMessage);
    }

    const contentLength = response.headers.get("content-length");
    if (contentLength === "0" || response.status === 204) {
      return {} as T;
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return await response.json();
    }
    
    throw new Error("Resposta não está em formato JSON");
  }

  async getAll(): Promise<ConsultaInterface[]> {
    const response = await fetch("/api/consultas");
    return this.handleResponse<ConsultaInterface[]>(response);
  }

  async create(data: ConsultaInterface): Promise<ConsultaInterface> {
    const response = await fetch("/api/consultas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<ConsultaInterface>(response);
  }

  async update(id: string, data: Partial<ConsultaInterface>): Promise<ConsultaInterface> {
    const response = await fetch(`/api/consultas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<ConsultaInterface>(response);
  }

  async delete(id: string): Promise<{ success: boolean }> {
    const response = await fetch(`/api/consultas/${id}`, {
      method: "DELETE",
    });
    return this.handleResponse<{ success: boolean }>(response);
  }
}