"use client";

import { useState } from "react";
import { AuthService } from "../service/auth-service";

interface LoginPayload {
  email: string;
  senha: string;
}

interface LoginResult {
  success: boolean;
  user?: any;
}

export function useLogin() {
  const authService = new AuthService();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(data: LoginPayload): Promise<LoginResult> {
    try {
      setLoading(true);
      setError("");

      const response = await authService.login(data);

      // 🔍 DEBUG: mostra a estrutura REAL que veio do backend
      console.log("📦 Resposta COMPLETA do backend:", JSON.stringify(response, null, 2));

      // ⚠️ AGORA VOCÊ VAI VER NO CONSOLE quais são as propriedades disponíveis
      // Exemplo: se tiver "ok" e "usuario", ajuste abaixo

      // Vou assumir que pode ser { ok: true, usuario: {...} } ou { success: true, user: {...} }
      // Vou fazer uma verificação genérica:
      const isSuccess = (response as any)?.ok === true || (response as any)?.success === true;
      const userData = (response as any)?.usuario || (response as any)?.user || (response as any)?.data;

      if (!isSuccess) {
        const msg = (response as any)?.mensagem || (response as any)?.message || "Erro ao realizar login";
        setError(msg);
        return { success: false };
      }

      if (!userData) {
        setError("Usuário não retornado pelo servidor");
        return { success: false };
      }

      // Salva os dados
      localStorage.setItem("user", JSON.stringify(userData));
      if (userData.role) {
        localStorage.setItem("role", userData.role);
      }

      return { success: true, user: userData };
    } catch (err) {
      console.error("Erro no hook useLogin:", err);
      setError("Erro interno ao tentar logar");
      return { success: false };
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