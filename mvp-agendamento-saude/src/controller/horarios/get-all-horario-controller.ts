import { GetAllHorariosUseCase } from "@/src/use-case/horarios/get-all-horario-use-case";
import { CreateLog } from "@/src/use-case/logs/create-log";

export class GetAllHorariosController {
  constructor(
    private useCase = new GetAllHorariosUseCase(),
    private log = new CreateLog()
  ) {}

  async handle() {
    const response = await this.useCase.execute();

    if (!response.status) {
      await this.log.execute(response);
    }

    return response;
  }
}