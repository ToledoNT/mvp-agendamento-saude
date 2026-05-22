import {
  NextRequest,
  NextResponse,
} from "next/server";

import { GetAllAppointmentsUseCase } from "@/src/use-case/agendamento/get-all-agendamento-use-case";

const getAllAppointmentsUseCase =
  new GetAllAppointmentsUseCase();

export class AgendamentoController {
  async getAll(
    _: NextRequest
  ) {
    try {
      const response =
        await getAllAppointmentsUseCase.execute();

      return NextResponse.json(
        response.data,
        {
          status: response.code,
        }
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message:
            "Erro ao buscar agendamentos",
        },
        {
          status: 500,
        }
      );
    }
  }
}