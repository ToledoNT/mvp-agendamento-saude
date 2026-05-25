
import { PrismaHorarioRepository } from "@/src/db/repositories/prisma-horario-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";

import { CreateLog } from "../logs/create-log";

interface CreateHorarioDTO {
  horario: string;
  medico: string;
  data: string;
}

export class CreateHorarioUseCase {
  async execute(
    data: CreateHorarioDTO[]
  ): Promise<ResponseTemplateInterface> {
    const responseCreate =
      await new PrismaHorarioRepository().createMany(
        data
      );

    if (!responseCreate.status) {
      await new CreateLog().execute(
        responseCreate
      );
    }

    return responseCreate;
  }
}