import { ResponseTemplateInterface } from "@/src/interface/response-template-interface";
import { ResponseTemplateModel } from "@/src/model/response-templete-model";
import { prisma } from "@/src/db/prisma-connection";

export class PrismaSchedulingRepository {
  async create(data: any): Promise<ResponseTemplateInterface> {
    try {
      const scheduling = await prisma.scheduling.create({
        data: {
          nome: data.nome,
          email: data.email,
          medico: data.medico,
          specialty: data.specialty,
          date: data.date,
          horario: data.horario,
          status: data.status,
        },
      });

      return new ResponseTemplateModel(
        true,
        201,
        "Agendamento criado com sucesso",
        scheduling
      );
    } catch (error) {
      console.error(error);

      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao criar agendamento",
        null
      );
    }
  }

  async update(id: string, data: any): Promise<ResponseTemplateInterface> {
    try {
      const scheduling = await prisma.scheduling.update({
        where: {
          id,
        },
        data: {
          nome: data.nome, 
          email: data.email,
          medico: data.medico,
          specialty: data.specialty,
          date: data.date,
          time: data.time,
          status: data.status,
        },
      });

      return new ResponseTemplateModel(
        true,
        200,
        "Agendamento atualizado com sucesso",
        scheduling
      );
    } catch (error) {
      console.error(error);

      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao atualizar agendamento",
        null
      );
    }
  }

  async deleteById(id: string): Promise<ResponseTemplateInterface> {
    try {
      await prisma.scheduling.delete({
        where: { id },
      });

      return new ResponseTemplateModel(
        true,
        200,
        "Agendamento deletado com sucesso",
        null
      );
    } catch (error) {
      console.error(error);

      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao deletar agendamento",
        null
      );
    }
  }

  async getAll(): Promise<ResponseTemplateInterface> {
    try {
      const schedulings = await prisma.scheduling.findMany({
        orderBy: {
          date: "desc",
        },
      });

      return new ResponseTemplateModel(
        true,
        200,
        "Agendamentos encontrados",
        schedulings
      );
    } catch (error) {
      console.error(error);

      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao buscar agendamentos",
        null
      );
    }
  }

  async findById(id: string): Promise<ResponseTemplateInterface> {
    try {
      const scheduling = await prisma.scheduling.findUnique({
        where: {
          id,
        },
      });

      return new ResponseTemplateModel(
        true,
        200,
        "Agendamento encontrado",
        scheduling
      );
    } catch (error) {
      console.error(error);

      return new ResponseTemplateModel(
        false,
        500,
        "Erro ao buscar agendamento",
        null
      );
    }
  }
}