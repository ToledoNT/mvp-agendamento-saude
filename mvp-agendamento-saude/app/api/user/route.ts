import { NextRequest } from "next/server";
import { CreateUserController } from "@/src/controller/user/create-user-controller";

export const runtime = "nodejs";

const controller = new CreateUserController();

export async function GET() {
  return Response.json({ message: "Use POST para criar usuário" });
}

export async function POST(req: NextRequest) {
  return controller.handle(req);
}