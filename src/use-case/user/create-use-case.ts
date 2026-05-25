import { ResponseTemplateInterface } from "@/src/interface/response-template-interface";
import { ICreateUser } from "../../interface/user/create-user-interface";
import { PrismaUserRepository } from "@/src/db/repositories/prisma-user-repository";
import { CreateLog } from "../logs/create-log";

export class CreateUserUsecase {
  async execute(conta: ICreateUser): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaUserRepository().create(conta);
    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }
    return responseCreate;
  }
}