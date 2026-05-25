import { CreateAppointmentUseCase } from "@/src/use-case/agendamento/create-agendamento-use-case copy";

import {
  NextRequest,
  NextResponse,
} from "next/server";

export class CreateAppointmentController {
  async handle(
    req: NextRequest
  ) {
    try {
      const body =
        await req.json();

      const data = {
        nome: body.nome,

        email: body.email,

        medico: body.medico,

        specialty:
          body.specialty,

        date: body.date,

        time: body.time,

        status: "AGENDADO",
      };

      if (
        !data.nome ||
        !data.email ||
        !data.medico ||
        !data.specialty ||
        !data.date ||
        !data.time
      ) {
        return NextResponse.json(
          
          {
            success: false,

            message:
              "Preencha os campos obrigatórios.",
          },
          { status: 400 }
        );
      }

      const scheduling =
        await new CreateAppointmentUseCase().execute(
          data
        );

      return NextResponse.json(
        {
          success: true,

          message:
            "Agendamento criado com sucesso.",

          data: scheduling,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,

          message:
            "Erro interno do servidor.",
        },
        { status: 500 }
      );
    }
  }
}