import { CreateMedicoUseCase } from "@/src/use-case/medico/create-medico-use-case";
import { NextRequest, NextResponse } from "next/server";

export class CreateMedicoController {
  async handle(req: NextRequest) {
    try {
      const body = await req.json();

      const data = {
        nome: body.nome,
        email: body.email,
        especialidade: body.especialidade,
      };

      if (!data.nome || !data.email || !data.especialidade) {
        return NextResponse.json(
          {
            success: false,
            message: "Preencha os campos obrigatórios.",
          },
          { status: 400 }
        );
      }

      const medico = await new CreateMedicoUseCase().execute(data);

      return NextResponse.json(
        {
          success: true,
          message: "Médico criado com sucesso.",
          data: medico,
        },
        { status: 201 }
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