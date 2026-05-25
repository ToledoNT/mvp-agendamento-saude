import { PrismaSchedulingRepository } from "@/src/db/repositories/prisma-agendamento-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class DeleteAppointmentUseCase {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    const responseDelete = await new PrismaSchedulingRepository().deleteById(id);

    if (!responseDelete.status) {
      await new CreateLog().execute(responseDelete);
    }

    return responseDelete;
  }
}