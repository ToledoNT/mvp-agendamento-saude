import { NextRequest } from "next/server";
import { LoginUserController } from "@/src/controller/user/login-controller";

export const runtime = "nodejs";

const loginController = new LoginUserController();
export async function POST(req: NextRequest) {
  return loginController.handle(req);
}