import { ResponseTemplateInterface } from "@/src/interface/response-template-interface";
import { ICreateUser } from "@/src/interface/user/create-user-interface";
import { ResponseTemplateModel } from "@/src/model/response-templete-model";
import { prisma } from "@/src/db/prisma-connection";
export class PrismaUserRepository {
  async create(
    data: ICreateUser
  ): Promise<ResponseTemplateInterface> {
    try {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: "USER",
        },
      });

      return new ResponseTemplateModel(
        true,
        201,
        "Usuário criado com sucesso",
        user
      );
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);

      if (
        error?.code === "P2002" &&
        error?.meta?.target?.includes("email")
      ) {
        return new ResponseTemplateModel(
          false,
          409,
          "E-mail já está em uso",
          null
        );
      }

      return new ResponseTemplateModel(
        false,
        500,
        "Erro interno ao criar usuário",
        null
      );
    }
  }

  async getByEmail(
    email: string
  ): Promise<ResponseTemplateInterface> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return new ResponseTemplateModel(
          false,
          404,
          "Usuário não encontrado",
          null
        );
      }

      return new ResponseTemplateModel(
        true,
        200,
        "Usuário encontrado com sucesso",
        user
      );
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);

      return new ResponseTemplateModel(
        false,
        500,
        "Erro interno ao buscar usuário",
        null
      );
    }
  }
}