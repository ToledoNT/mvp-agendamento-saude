import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/db/prisma-connection";

export class AgendamentoController {
  async getAll(_: NextRequest) {
    try {
      const agendamentos = await prisma.scheduling.findMany({
        orderBy: {
        },
      });

      return NextResponse.json(
        {
          success: true,
          data: agendamentos,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: "Erro ao buscar agendamentos",
        },
        { status: 500 }
      );
    }
  }
}