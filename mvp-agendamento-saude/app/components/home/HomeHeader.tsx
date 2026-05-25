"use client";

import { useRouter } from "next/navigation";

interface Props {
  email?: string;
  isAdmin: boolean;
  onLogout: () => void;
}

export function HomeHeader({
  email,
  isAdmin,
  onLogout,
}: Props) {
  const router = useRouter();

  function handleLogout() {
    onLogout();      // limpa usuário (localStorage etc)
    router.push("/"); // 👈 vai pra home
  }

  return (
    <div style={styles.header}>
      <div>
        <h1 style={styles.title}>
          🏥 Sistema de Agendamento
        </h1>

        <p style={styles.subtitle}>
          Posto de Saúde – Gestão de Consultas
        </p>

        {email && (
          <p style={styles.welcome}>
            👋 Olá, <strong>{email}</strong>{" "}
            {isAdmin && "(Admin)"}
          </p>
        )}
      </div>

      <button
        style={styles.logoutButton}
        onClick={handleLogout}
      >
        🚪 Sair
      </button>
    </div>
  );
}

const styles: any = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "3rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid rgba(37,99,235,0.2)",
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "0.5rem",
  },

  subtitle: {
    color: "#475569",
    marginBottom: "0.5rem",
  },

  welcome: {
    background: "#eff6ff",
    color: "#2563eb",
    padding: "0.3rem 0.8rem",
    borderRadius: "999px",
    display: "inline-block",
  },

  logoutButton: {
    background: "white",
    border: "1px solid #e2e8f0",
    color: "#dc2626",
    padding: "0.5rem 1.2rem",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: 600,
  },
};