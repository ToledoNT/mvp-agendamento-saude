import { NextResponse } from "next/server";

import { GetAllAppointmentsUseCase } from "@/src/use-case/agendamento/get-all-agendamento-use-case";

const getAllAppointmentsUseCase =
  new GetAllAppointmentsUseCase();

export class GetAllAppointmentsController {
  async handle() {
    try {
      const appointments =
        await getAllAppointmentsUseCase.execute();

      return NextResponse.json(
        appointments,
        {
          status: appointments.code,
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