import { PrismaSchedulingRepository } from "@/src/db/repositories/prisma-agendamento-repository";

import { IUpdateAppointment } from "../../interface/agendamentos/update-agendamento-interface";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";

import { CreateLog } from "../logs/create-log";

export class UpdateAppointmentUseCase {
  async execute(
    data: IUpdateAppointment
  ): Promise<ResponseTemplateInterface> {
    const responseUpdate =
      await new PrismaSchedulingRepository().update(
        data.id,
        data
      );

    if (!responseUpdate.status) {
      await new CreateLog().execute(responseUpdate);
    }

    return responseUpdate;
  }
}