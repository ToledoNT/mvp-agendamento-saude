import { AgendamentoController } from "@/src/controller/appointments/consultas-controller";
import { NextRequest } from "next/server";

const controller = new AgendamentoController();

export async function GET(req: NextRequest) {
  return controller.getAll(req);
}