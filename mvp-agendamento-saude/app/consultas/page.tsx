"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Consultas() {
  const [consultas, setConsultas] = useState<any[]>([]);
  const [consultaSelecionada, setConsultaSelecionada] = useState<any | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("consultas") || "[]");
    setConsultas(data);
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  function abrirDetalhes(consulta: any) {
    setConsultaSelecionada(consulta);
  }

  function fecharDetalhes() {
    setConsultaSelecionada(null);
  }

  return (
    <main style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>📋 Minhas Consultas</h1>
          <p style={styles.subtitle}>
            Acompanhe seus agendamentos no sistema
          </p>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          🚪 Sair
        </button>
      </div>

      {consultas.length === 0 ? (
        <div style={styles.empty}>
          <h2>Nenhuma consulta encontrada</h2>
          <p>Você ainda não possui agendamentos realizados.</p>
          <Link href="/agendamento" style={styles.emptyButton}>
            + Agendar consulta
          </Link>
        </div>
      ) : (
        <div style={styles.grid}>
          {consultas.map((c, i) => (
            <div key={i} className="card-hover" style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.badge}>✅ Agendado</span>
              </div>
              <h3 style={styles.name}>{c.nome}</h3>
              <div style={styles.info}>
                <p>
                  <strong>👨‍⚕️ Médico:</strong> {c.medico}
                </p>
                <p>
                  <strong>⏰ Horário:</strong> {c.horario}
                </p>
              </div>
              <button
                style={styles.button}
                onClick={() => abrirDetalhes(c)}
              >
                Ver detalhes →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal de detalhes da consulta - com textos escuros */}
      {consultaSelecionada && (
        <div style={styles.modalOverlay} onClick={fecharDetalhes}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>🔍 Detalhes da Consulta</h2>
              <button onClick={fecharDetalhes} style={styles.modalClose}>
                ✕
              </button>
            </div>
            <div style={styles.modalBody}>
              <p style={styles.modalBodyP}>
                <strong style={styles.modalBodyStrong}>👤 Paciente:</strong> {consultaSelecionada.nome}
              </p>
              <p style={styles.modalBodyP}>
                <strong style={styles.modalBodyStrong}>👨‍⚕️ Médico(a):</strong> {consultaSelecionada.medico}
              </p>
              <p style={styles.modalBodyP}>
                <strong style={styles.modalBodyStrong}>⏰ Horário:</strong> {consultaSelecionada.horario}
              </p>
              <p style={styles.modalBodyP}>
                <strong style={styles.modalBodyStrong}>✅ Status:</strong>{" "}
                <span style={styles.statusBadge}>Agendado</span>
              </p>
              <p style={styles.modalBodyP}>
                <strong style={styles.modalBodyStrong}>📅 Data do agendamento:</strong>{" "}
                {new Date().toLocaleDateString("pt-BR")}
              </p>
              <hr style={styles.divider} />
              <p style={styles.modalObs}>
                * Para remarcar ou cancelar, entre em contato com a unidade de saúde.
              </p>
            </div>
            <button onClick={fecharDetalhes} style={styles.modalButton}>
              Fechar
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.15) !important;
          border-color: #2563eb !important;
        }
        button:hover {
          background-color: #1d4ed8 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        button:active {
          transform: translateY(1px);
        }
      `}</style>
    </main>
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
  empty: {
    marginTop: "2rem",
    padding: "3rem",
    background: "white",
    borderRadius: "24px",
    textAlign: "center",
    color: "#475569",
    boxShadow: "0 10px 15px -6px rgba(0, 0, 0, 0.05)",
  },
  emptyButton: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.6rem 1.5rem",
    background: "#2563eb",
    color: "white",
    borderRadius: "40px",
    textDecoration: "none",
    fontWeight: 600,
    transition: "0.2s",
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
    boxShadow: "0 10px 15px -6px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
    transition: "all 0.25s ease",
    border: "1px solid rgba(203, 213, 225, 0.4)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  badge: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  name: {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "0.75rem",
    color: "#0f172a",
  },
  info: {
    fontSize: "0.9rem",
    color: "#334155",
    marginBottom: "1.5rem",
    flex: 1,
  },
  button: {
    width: "100%",
    padding: "0.6rem",
    border: "none",
    borderRadius: "40px",
    background: "#2563eb",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  // Modal estilos com contraste escuro
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "white",
    borderRadius: "32px",
    maxWidth: "500px",
    width: "90%",
    padding: "1.5rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    animation: "fadeInUp 0.2s ease",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  modalTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#0f172a", // escuro
  },
  modalClose: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#64748b",
    transition: "0.2s",
  },
  modalBody: {
    marginBottom: "1.5rem",
    color: "#1e293b", // texto base escuro
  },
  modalBodyP: {
    marginBottom: "0.75rem",
    fontSize: "0.95rem",
    color: "#1e293b", // escuro
  },
  modalBodyStrong: {
    color: "#0f172a", // quase preto para negritos
    fontWeight: 600,
  },
  statusBadge: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  divider: {
    margin: "1rem 0",
    border: "none",
    borderTop: "1px solid #e2e8f0",
  },
  modalObs: {
    fontSize: "0.8rem",
    color: "#475569", // cinza escuro legível
    fontStyle: "italic",
  },
  modalButton: {
    width: "100%",
    padding: "0.6rem",
    background: "#f1f5f9",
    border: "none",
    borderRadius: "40px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.2s",
    color: "#0f172a", // texto escuro no botão
  },
};

// Animações
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(styleSheet);
}