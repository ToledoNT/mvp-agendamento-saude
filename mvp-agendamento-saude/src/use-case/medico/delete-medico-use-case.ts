import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { PrismaMedicoRepository } from "@/src/db/repositories/prisma-medico-repository";

export class DeleteMedicoUseCase {
  async execute(
    id: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const response =
        await new PrismaMedicoRepository().delete(id);

      return response;
    } catch (error) {
      console.error("DeleteMedicoUseCase error:", error);

      return {
        status: false,
        code: 500,
        message: "Erro ao deletar médico",
        data: null,
      };
    }
  }
}