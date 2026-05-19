import { IScheduling } from "@/src/interface/agendamentos/create-agendamento-interface";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { PrismaSchedulingRepository } from "@/src/db/repositories/prisma-agendamento-repository";

export class CreateAppointmentUseCase {
  async execute(
    appointment: IScheduling
  ): Promise<ResponseTemplateInterface> {
    try {
      const responseCreate =
        await new PrismaSchedulingRepository().create(
          appointment
        );

      return responseCreate;
    } catch (error) {
      console.error("CreateAppointmentUseCase error:", error);

      return {
        status: false,
        code: 500,
        message: "Erro ao criar agendamento",
        data: null,
      };
    }
  }
}