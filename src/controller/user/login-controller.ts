import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export class LoginUserController {
  async handle(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();

      const { email, senha } = body;

      if (!email || !senha) {
        return NextResponse.json(
          {
            success: false,
            message: "Email e senha são obrigatórios",
          },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            message: "Usuário não encontrado",
          },
          { status: 404 }
        );
      }

      if (senha !== user.password) {
        return NextResponse.json(
          {
            success: false,
            message: "Senha inválida",
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Login realizado com sucesso",
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        },
        { status: 200 }
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