import { CreateHorarioUseCase } from "@/src/use-case/horarios/create-horario-use-case";
import { NextRequest, NextResponse } from "next/server";

export class CreateManyHorariosController {
  async handle(req: NextRequest) {
    try {
      const body = await req.json();

      const result = await new CreateHorarioUseCase().execute(body);

      return NextResponse.json(
        {
          status: true,
          data: result,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          status: false,
          message: "Erro ao criar horários",
          data: null,
        },
        { status: 500 }
      );
    }
  }
}