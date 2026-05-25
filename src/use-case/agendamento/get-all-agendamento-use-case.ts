import { PrismaSchedulingRepository } from "@/src/db/repositories/prisma-agendamento-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetAllAppointmentsUseCase {
  async execute(): Promise<ResponseTemplateInterface> {
    const response = await new PrismaSchedulingRepository().getAll();

    if (!response.status) {
      await new CreateLog().execute(response);
    }

    return response;
  }
}