import { CreateUserUsecase } from "@/src/use-case/user/create-use-case";
import { NextRequest, NextResponse } from "next/server";

export class CreateUserController {
  async handle(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();

      const { name, email, password, role } = body;

      if (!name || !email || !password) {
        return NextResponse.json(
          {
            success: false,
            message: "Nome, email e senha são obrigatórios",
          },
          { status: 400 }
        );
      }

      const useCase = new CreateUserUsecase();

      const result = await useCase.execute({
        name,
        email,
        password,
        role,
      });

      return NextResponse.json(
        {
          success: result.status,
          message: result.message,
          data: result.data ?? null,
        },
        { status: result.code }
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: "Erro interno do servidor",
        },
        { status: 500 }
      );
    }
  }
}