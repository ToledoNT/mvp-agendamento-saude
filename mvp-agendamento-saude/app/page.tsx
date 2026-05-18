"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "./hook/use-login";


export default function Login() {
  const router = useRouter();

  const { login, loading, error } = useLogin();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    const response = await login({
      email,
      senha,
    });

    if (!response) return;

    router.push("/home");
  }

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        {/* Título */}
        <div style={styles.titleWrapper}>
          <span style={styles.icon}>🏥</span>
          <h1 style={styles.title}>Acesso ao Sistema</h1>
        </div>

        <p style={styles.subtitle}>
          Informe suas credenciais para continuar
        </p>

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <span style={styles.inputIcon}>📧</span>

            <input
              style={styles.input}
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <span style={styles.inputIcon}>🔒</span>

            <input
              style={styles.input}
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button
            type="button"
            style={styles.button}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading
              ? "Entrando..."
              : "Entrar no sistema →"}
          </button>

          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          <div style={styles.helperBox}>
            <p style={styles.helperTitle}>
              🔐 Credenciais de teste
            </p>

            <p style={styles.helper}>
              <strong>Admin:</strong>
              {" "}
              admin@sus.gov.br / 123456
            </p>

            <p style={styles.helper}>
              <strong>Usuário:</strong>
              {" "}
              usuario@sus.gov.br / 123456
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        input::placeholder {
          color: #94a3b8;
        }

        input {
          color: #0f172a;
          background: transparent;
          width: 100%;
          border: none;
          outline: none;
          font-size: 0.95rem;
        }

        button {
          transition: all 0.2s ease;
        }

        button:hover {
          background-color: #1d4ed8 !important;
        }
      `}</style>
    </main>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: 440,
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "2rem",
    boxShadow:
      "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
  },

  titleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.5rem",
  },

  icon: {
    fontSize: "2rem",
  },

  title: {
    fontSize: "1.8rem",
    fontWeight: 700,
    background:
      "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    margin: 0,
  },

  subtitle: {
    fontSize: "0.9rem",
    color: "#475569",
    marginBottom: "1.8rem",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.6rem 1rem",
    borderRadius: "1rem",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ffffff",
  },

  inputIcon: {
    fontSize: "1.2rem",
    color: "#64748b",
  },

  input: {
    flex: 1,
  },

  button: {
    marginTop: "0.5rem",
    padding: "0.75rem",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "2rem",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
  },

  error: {
    color: "#dc2626",
    fontSize: "0.9rem",
  },

  helperBox: {
    marginTop: "1rem",
    padding: "1rem",
    background: "#f8fafc",
    borderRadius: "1rem",
    border: "1px solid #e2e8f0",
  },

  helperTitle: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "0.5rem",
  },

  helper: {
    fontSize: "0.75rem",
    color: "#475569",
    margin: "0.25rem 0",
  },
}; 