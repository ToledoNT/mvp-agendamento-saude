"use client";

import { useState } from "react";

import { useConsultas } from "../hook/use-consultas";

import { ConsultaModal } from "../components/consultas/ConsultaModal";

import { EmptyConsultas } from "../components/consultas/EmptyConsultas";
import { ConsultaCard } from "../components/admin/consultCard";

export default function Consultas() {
  const { consultas } =
    useConsultas();

  const [
    consultaSelecionada,
    setConsultaSelecionada,
  ] = useState<any>(null);

  function handleLogout() {
    localStorage.removeItem("user");

    window.location.href = "/";
  }

  return (
    <>
      <main style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              📋 Minhas Consultas
            </h1>

            <p style={styles.subtitle}>
              Acompanhe seus
              agendamentos
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            🚪 Sair
          </button>
        </div>

        {consultas?.length === 0 ? (
          <EmptyConsultas
            styles={styles}
          />
        ) : (
          <div style={styles.grid}>
            {consultas?.map(
              (consulta) => (
               <ConsultaCard
  key={consulta.id}
  consulta={consulta}
  onDetails={() =>
    setConsultaSelecionada(consulta)
  }
/>
              )
            )}
          </div>
        )}

        {consultaSelecionada && (
          <ConsultaModal
            consulta={
              consultaSelecionada
            }
            onClose={() =>
              setConsultaSelecionada(
                null
              )
            }
            styles={styles}
          />
        )}
      </main>

      <style jsx>{`
        .card-hover:hover {
          transform: translateY(-6px);

          box-shadow: 0 20px 25px
            -12px
            rgba(0, 0, 0, 0.15) !important;

          border-color: #2563eb !important;
        }

        button:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    padding: "2rem",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "3rem",
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#0f172a",
  },

  subtitle: {
    color: "#475569",
  },

  logoutButton: {
    background: "white",
    border: "1px solid #e2e8f0",
    color: "#dc2626",
    padding: "0.5rem 1.2rem",
    borderRadius: "40px",
    cursor: "pointer",
  },

  empty: {
    background: "white",
    padding: "3rem",
    borderRadius: "24px",
    textAlign: "center",
  },

  emptyButton: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.6rem 1.5rem",
    background: "#2563eb",
    color: "white",
    borderRadius: "40px",
    textDecoration: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.8rem",
  },

  card: {
    background: "white",
    padding: "1.8rem",
    borderRadius: "24px",
    border:
      "1px solid rgba(203, 213, 225, 0.4)",
  },

  cardHeader: {
    marginBottom: "1rem",
  },

  badge: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
  },

  name: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#0f172a",
  },

  info: {
    color: "#334155",
    margin: "1rem 0",
  },

  button: {
    width: "100%",
    padding: "0.6rem",
    border: "none",
    borderRadius: "40px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background:
      "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    background: "white",
    padding: "2rem",
    borderRadius: "24px",
    width: "90%",
    maxWidth: "500px",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },

  modalTitle: {
    color: "#0f172a",
  },

  modalClose: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  modalBody: {
    color: "#1e293b",
  },

  modalBodyP: {
    marginBottom: "1rem",
  },

  modalBodyStrong: {
    color: "#0f172a",
  },

  modalButton: {
    width: "100%",
    marginTop: "1rem",
    padding: "0.7rem",
    border: "none",
    borderRadius: "40px",
    background: "#f1f5f9",
    cursor: "pointer",
  },
};