import { DatabaseLog } from "@/src/db/repositories/prisma-logs-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";

export class CreateLog {
  async execute(value: ResponseTemplateInterface): Promise<void> {
    await new DatabaseLog().create(value);
    return;
  }
}