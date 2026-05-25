
import { GetAllMedicoUseCase } from "@/src/use-case/medico/get-all-medicos-use-case";
import { NextResponse } from "next/server";

export class GetAllMedicoController {
  async handle() {
    try {
      const response = await new GetAllMedicoUseCase().execute();

      return NextResponse.json(
        {
          success: response.status,
          message: response.message,
          data: response.data,
        },
        { status: response.code }
      );
    } catch (error) {
      console.error("GetAllMedicoController error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Erro ao buscar médicos",
          data: null,
        },
        { status: 500 }
      );
    }
  }
}