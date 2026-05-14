"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch {
        // ignora erro de parse
      }
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  const isAdmin = user?.role === "admin";

  return (
    <main style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🏥 Sistema de Agendamento</h1>
          <p style={styles.subtitle}>
            Posto de Saúde – Gestão de Consultas
          </p>
          {user && (
            <p style={styles.welcome}>
              👋 Olá, <strong>{user.email}</strong> {isAdmin && "(Admin)"}
            </p>
          )}
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          🚪 Sair
        </button>
      </div>

      <div style={styles.grid}>
        {/* Usuários comuns: Agendar Consulta e Minhas Consultas */}
        {!isAdmin && (
          <>
            <Card
              title="📅 Agendar Consulta"
              description="Marque uma nova consulta médica"
              href="/agendamento"
            />
            <Card
              title="📋 Minhas Consultas"
              description="Visualize seus agendamentos"
              href="/consultas"
            />
          </>
        )}

        {/* Administrador: apenas Painel Admin */}
        {isAdmin && (
          <Card
            title="⚙️ Painel Admin"
            description="Gerencie todos os agendamentos"
            href="/admin"
          />
        )}
      </div>
    </main>
  );
}

function Card({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div className="card-hover" style={styles.card}>
        <h2 style={styles.cardTitle}>{title}</h2>
        <p style={styles.cardDesc}>{description}</p>
        <span style={styles.cardButton}>Acessar →</span>
      </div>
    </Link>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    padding: "2rem",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "3rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid rgba(37, 99, 235, 0.2)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
    color: "#0f172a",
    letterSpacing: "-0.3px",
  },
  subtitle: {
    color: "#475569",
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },
  welcome: {
    fontSize: "0.9rem",
    color: "#2563eb",
    marginTop: "0.5rem",
    background: "#eff6ff",
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
  },
  logoutButton: {
    background: "white",
    border: "1px solid #e2e8f0",
    color: "#dc2626",
    padding: "0.5rem 1.2rem",
    borderRadius: "40px",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.8rem",
  },
  card: {
    background: "white",
    padding: "1.8rem",
    borderRadius: "24px",
    color: "#0f172a",
    boxShadow: "0 10px 15px -6px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
    transition: "all 0.25s ease",
    cursor: "pointer",
    border: "1px solid rgba(203, 213, 225, 0.4)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "0.75rem",
  },
  cardDesc: {
    fontSize: "0.9rem",
    color: "#475569",
    marginBottom: "1.5rem",
    flex: 1,
  },
  cardButton: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#2563eb",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
  },
};

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.15) !important;
      border-color: #2563eb !important;
    }
    button:hover {
      background-color: #fef2f2 !important;
      border-color: #fecaca !important;
      transform: translateY(-1px);
    }
    button:active {
      transform: translateY(1px);
    }
  `;
  document.head.appendChild(styleSheet);
}