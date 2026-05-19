import { NextRequest } from "next/server";

import { CreateAppointmentController } from "@/src/controller/appointments/create-agendamento-controller";
import { DeleteAppointmentController } from "@/src/controller/appointments/delete-agendamento-controller";
import { GetAllAppointmentsController } from "@/src/controller/appointments/get-all-agendamentos-controler";
import { UpdateAppointmentController } from "@/src/controller/appointments/update-agendamento-controller";

const createController = new CreateAppointmentController();
const getAllController = new GetAllAppointmentsController();
const updateController = new UpdateAppointmentController();
const deleteController = new DeleteAppointmentController();

export async function POST(req: NextRequest) {
  return createController.handle(req);
}

export async function GET() {
  return getAllController.handle();
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return updateController.handle(req, params.id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return deleteController.handle(req, params.id);
}