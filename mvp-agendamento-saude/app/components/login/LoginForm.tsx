"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/service/auth-service";
import { Input } from "../input";
import { Button } from "./button";

export function LoginForm() {
  const router = useRouter();

  const authService = new AuthService();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    setLoading(true);

    const response = await authService.login({
      email,
      senha,
    });

    setLoading(false);

    if (!response.status) {
      alert(response.message);
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify(response.data)
    );

    router.push("/home");
  }

  return (
    <div style={styles.form}>
      <Input
        icon="📧"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={setEmail}
      />

      <Input
        icon="🔒"
        type="password"
        placeholder="Digite sua senha"
        value={senha}
        onChange={setSenha}
      />

      <Button
        title="Entrar no sistema →"
        onClick={handleLogin}
        loading={loading}
      />
    </div>
  );
}

const styles: any = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};