import { PrismaHorarioRepository } from "@/src/db/repositories/prisma-horario-repository";
import { ResponseTemplateInterface } from "@/src/interface/response-template-interface";
import { CreateLog } from "@/src/use-case/logs/create-log";

export class GetAllHorariosUseCase {
  constructor(
    private horarioRepository = new PrismaHorarioRepository(),
    private log = new CreateLog()
  ) {}

  async execute(): Promise<ResponseTemplateInterface> {
    const response = await this.horarioRepository.getAll();

    if (!response.status) {
      await this.log.execute(response);
    }

    return response;
  }
}