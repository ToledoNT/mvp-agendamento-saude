'use client';

import { useState } from "react";
import { useConsultas } from "../hook/use-consultas";
import { ConsultaCard } from "../components/admin/consultCard";
import { ConsultaDetailsModal } from "../components/admin/ConsultDetailsModal";

export default function Admin() {
  const { consultas } = useConsultas();

  const [consultaSelecionada, setConsultaSelecionada] =
    useState<any>(null);

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  function fecharModal() {
    setConsultaSelecionada(null);
  }

  return (
    <main style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            ⚙️ Painel Administrativo
          </h1>

          <p style={styles.subtitle}>
            Gerencie todos os agendamentos
          </p>
        </div>

        <button
          style={styles.logoutButton}
          onClick={handleLogout}
        >
          🚪 Sair
        </button>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {consultas?.map((consulta) => (
          <ConsultaCard
            key={consulta.id}
            consulta={consulta}
            onDetails={() =>
              setConsultaSelecionada(consulta)
            }
          />
        ))}
      </div>

      {/* MODAL (COMPONENTE) */}
      {consultaSelecionada && (
        <ConsultaDetailsModal
          consulta={consultaSelecionada}
          onClose={fecharModal}
        />
      )}
    </main>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    padding: "2rem",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #cbd5e1",
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },

  subtitle: {
    color: "#64748b",
    marginTop: "0.5rem",
    fontSize: "1rem",
  },

  logoutButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "0.7rem 1.3rem",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: 600,
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
};