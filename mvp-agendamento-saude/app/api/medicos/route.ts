import { NextRequest } from "next/server";

import { CreateMedicoController } from "@/src/controller/medico/medico-controller";
import { GetAllMedicoController } from "@/src/controller/medico/get-all-medico-controller";

const createController = new CreateMedicoController();
const getAllController = new GetAllMedicoController();

export async function GET() {
  return getAllController.handle();
}

export async function POST(req: NextRequest) {
  return createController.handle(req);
}