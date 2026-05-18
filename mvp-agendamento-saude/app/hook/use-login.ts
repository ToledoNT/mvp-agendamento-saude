"use client";

import { useState } from "react";
import { AuthService } from "../service/auth-service";

interface LoginPayload {
  email: string;
  senha: string;
}

export function useLogin() {
  const authService = new AuthService();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(data: LoginPayload) {
    try {
      setLoading(true);
      setError("");

      const response = await authService.login(data);

      if (!response.status) {
        setError(response.message);
        return null;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      return response;
    } catch (err) {
      setError("Erro ao realizar login");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
    error,
  };
}