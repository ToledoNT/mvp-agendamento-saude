import { IMedico } from "@/src/interface/medicos/create-medico-interface";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { PrismaMedicoRepository } from "@/src/db/repositories/prisma-medico-repository";

export class CreateMedicoUseCase {
  async execute(
    medico: IMedico
  ): Promise<ResponseTemplateInterface> {
    try {
      const responseCreate =
        await new PrismaMedicoRepository().create(medico);

      return responseCreate;
    } catch (error) {
      console.error("CreateMedicoUseCase error:", error);

      return {
        status: false,
        code: 500,
        message: "Erro ao criar médico",
        data: null,
      };
    }
  }
}