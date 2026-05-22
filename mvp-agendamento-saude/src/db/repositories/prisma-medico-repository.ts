import { IMedico } from "@/src/interface/medicos/create-medico-interface";
import { prisma } from "../prisma-connection";

export class PrismaMedicoRepository {
  async create(data: IMedico) {
    const medico = await prisma.medico.create({
      data,
    });

    return {
      status: true,
      code: 201,
      message: "Médico criado com sucesso",
      data: medico,
    };
  }

  async findAll() {
    const medicos = await prisma.medico.findMany({
      orderBy: { nome: "asc" },
    });

    return {
      status: true,
      code: 200,
      message: "Médicos encontrados",
      data: medicos,
    };
  }

  async delete(id: string) {
    await prisma.medico.delete({
      where: { id },
    });

    return {
      status: true,
      code: 200,
      message: "Médico deletado com sucesso",
      data: null,
    };
  }
}