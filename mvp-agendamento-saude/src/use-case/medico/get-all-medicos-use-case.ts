import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { PrismaMedicoRepository } from "@/src/db/repositories/prisma-medico-repository";

export class GetAllMedicoUseCase {
  async execute(): Promise<ResponseTemplateInterface> {
    try {
      const response =
        await new PrismaMedicoRepository().findAll();

      return response;
    } catch (error) {
      console.error("GetAllMedicoUseCase error:", error);

      return {
        status: false,
        code: 500,
        message: "Erro ao buscar médicos",
        data: null,
      };
    }
  }
}