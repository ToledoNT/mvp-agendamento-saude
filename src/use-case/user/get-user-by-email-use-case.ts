import { PrismaUserRepository } from "@/src/db/repositories/prisma-user-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetUserByEmailUseCase {
  async execute(email: string): Promise<ResponseTemplateInterface> {
    const response = await new PrismaUserRepository().getByEmail(email);

    if (!response.status) {
      await new CreateLog().execute(response);
    }

    return response;
  }
}