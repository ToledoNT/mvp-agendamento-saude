import { LoginRequest, LoginResponse } from "../interface/auth-interfaces";

export class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      return result;
    } catch (error) {
      return {
        status: false,
        message: "Erro ao conectar com servidor",
      };
    }
  }
  
} 