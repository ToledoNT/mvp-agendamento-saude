import { CreateHorarioUseCase } from "@/src/use-case/horarios/create-horario-use-case";
import { NextRequest, NextResponse } from "next/server";

export class CreateManyHorariosController {
  async handle(req: NextRequest) {
    try {
      const body = await req.json();

      const response =
        await new CreateHorarioUseCase().execute(
          body
        );

      return NextResponse.json(
        response,
        {
          status: response.code,
        }
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          status: false,
          code: 500,
          message:
            "Erro ao criar horários",
          data: null,
        },
        { status: 500 }
      );
    }
  }
}