import { UpdateAppointmentUseCase } from "@/src/use-case/agendamento/update-agendamento-use-case";
import { NextRequest, NextResponse } from "next/server";


export class UpdateAppointmentController {
  async handle(
    req: NextRequest,
    id: string
  ) {
    try {
      const body = await req.json();

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
        await new UpdateAppointmentUseCase().execute({
          id,
          patientName: body.patientName,
          email: body.email,
          specialty: body.specialty,
          date: body.date,
          time: body.time,
          status: body.status,
        });

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