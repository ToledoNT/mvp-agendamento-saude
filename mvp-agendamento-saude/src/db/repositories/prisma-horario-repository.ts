import { prisma } from "@/src/db/prisma-connection";

import { ResponseTemplateInterface } from "@/src/interface/response-template-interface";

interface CreateHorarioDTO {
  horario: string;
  medico: string;
  data: string;
}

export class PrismaHorarioRepository {
  async createMany(
    data: CreateHorarioDTO[]
  ): Promise<ResponseTemplateInterface> {
    try {
      await prisma.horario.createMany({
        data,
      });

      const horarios =
        await prisma.horario.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: data.length,
        });

      return {
        status: true,
        code: 201,
        message:
          "Horários criados com sucesso",
        data: horarios,
      };
    } catch (error) {
      console.error(error);

      return {
        status: false,
        code: 500,
        message:
          "Erro ao criar horários",
        data: null,
      };
    }
  }

  async getAll(): Promise<ResponseTemplateInterface> {
    try {
      const horarios =
        await prisma.horario.findMany({
          orderBy: {
            horario: "asc",
          },
        });

      return {
        status: true,
        code: 200,
        message:
          "Horários encontrados",
        data: horarios,
      };
    } catch (error) {
      console.error(error);

      return {
        status: false,
        code: 500,
        message:
          "Erro ao buscar horários",
        data: null,
      };
    }
  }
}