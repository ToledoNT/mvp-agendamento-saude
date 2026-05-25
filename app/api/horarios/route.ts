import { NextRequest } from "next/server";

import { CreateManyHorariosController } from "@/src/controller/horarios/create-horarios-controller";
import { GetAllHorariosController } from "@/src/controller/horarios/get-all-horario-controller";

export const runtime = "nodejs";

const createManyHorariosController = new CreateManyHorariosController();
const getAllHorariosController = new GetAllHorariosController();

export async function POST(req: NextRequest) {
  return createManyHorariosController.handle(req);
}

export async function GET() {
  return getAllHorariosController.handle();
}