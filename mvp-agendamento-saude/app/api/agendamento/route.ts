import { NextRequest } from "next/server";

import { CreateAppointmentController } from "@/src/controller/appointments/create-agendamento-controller";
import { GetAllAppointmentsController } from "@/src/controller/appointments/get-all-agendamentos-controler";

const createController = new CreateAppointmentController();
const getAllController = new GetAllAppointmentsController();

export async function POST(req: NextRequest) {
  return createController.handle(req);
}

export async function GET() {
  return getAllController.handle();
}