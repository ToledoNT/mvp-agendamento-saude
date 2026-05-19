import { DeleteAppointmentUseCase } from "@/src/use-case/agendamento/delete-agendamento-use-case";
import { NextRequest, NextResponse } from "next/server";

export class DeleteAppointmentController {
  async handle(
    req: NextRequest,
    id: string
  ) {
    try {
      if (!id) {
        return NextResponse.json(
          {
            success: false,
            message: "ID é obrigatório.",
          },
          { status: 400 }
        );
      }

      const result =
        await new DeleteAppointmentUseCase().execute(
          id
        );

      return NextResponse.json(
        result,
        {
          status: result.code,
        }
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: "Erro interno do servidor.",
        },
        { status: 500 }
      );
    }
  }
}