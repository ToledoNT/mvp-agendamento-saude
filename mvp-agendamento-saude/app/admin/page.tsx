"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Admin() {
  const [consultas, setConsultas] = useState<any[]>([]);
  const [consultaEditando, setConsultaEditando] = useState<any | null>(null);
  const [formEdit, setFormEdit] = useState({ nome: "", medico: "", horario: "" });
  const [mostrarModalCriacao, setMostrarModalCriacao] = useState(false);
  const [formCriacao, setFormCriacao] = useState({ nome: "", medico: "", horario: "" });

  useEffect(() => {
    carregarConsultas();
  }, []);

  function carregarConsultas() {
    const data = JSON.parse(localStorage.getItem("consultas") || "[]");
    setConsultas(data);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  function abrirModalGerenciar(consulta: any) {
    setConsultaEditando(consulta);
    setFormEdit({
      nome: consulta.nome,
      medico: consulta.medico,
      horario: consulta.horario,
    });
  }

  function fecharModalEdicao() {
    setConsultaEditando(null);
    setFormEdit({ nome: "", medico: "", horario: "" });
  }

  function handleSalvarEdicao() {
    if (!formEdit.nome || !formEdit.medico || !formEdit.horario) {
      alert("Preencha todos os campos");
      return;
    }

    const novasConsultas = consultas.map((c) =>
      c === consultaEditando ? { ...c, ...formEdit } : c
    );
    localStorage.setItem("consultas", JSON.stringify(novasConsultas));
    setConsultas(novasConsultas);
    fecharModalEdicao();
  }

  function handleExcluir() {
    if (confirm(`Tem certeza que deseja excluir a consulta de ${consultaEditando.nome}?`)) {
      const novasConsultas = consultas.filter((c) => c !== consultaEditando);
      localStorage.setItem("consultas", JSON.stringify(novasConsultas));
      setConsultas(novasConsultas);
      fecharModalEdicao();
    }
  }

  function abrirModalCriacao() {
    setFormCriacao({ nome: "", medico: "", horario: "" });
    setMostrarModalCriacao(true);
  }

  function fecharModalCriacao() {
    setMostrarModalCriacao(false);
    setFormCriacao({ nome: "", medico: "", horario: "" });
  }

  function handleAdicionarConsulta() {
    if (!formCriacao.nome || !formCriacao.medico || !formCriacao.horario) {
      alert("Preencha todos os campos");
      return;
    }

    const novaConsulta = {
      nome: formCriacao.nome,
      medico: formCriacao.medico,
      horario: formCriacao.horario,
      status: "Agendado",
    };

    const novasConsultas = [...consultas, novaConsulta];
    localStorage.setItem("consultas", JSON.stringify(novasConsultas));
    setConsultas(novasConsultas);
    fecharModalCriacao();
  }

  return (
    <main style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>⚙️ Painel Administrativo</h1>
          <p style={styles.subtitle}>
            Gerencie todos os agendamentos do sistema
          </p>
        </div>
        <div style={styles.headerButtons}>
          <button onClick={abrirModalCriacao} style={styles.addButton}>
            ➕ Nova Consulta
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            🚪 Sair
          </button>
        </div>
      </div>

      {consultas.length === 0 ? (
        <div style={styles.empty}>
          <h2>Nenhum agendamento encontrado</h2>
          <p>Não há consultas registradas no sistema.</p>
          <button onClick={abrirModalCriacao} style={styles.emptyButton}>
            + Adicionar consulta
          </button>
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
                <p><strong>👨‍⚕️ Médico:</strong> {c.medico}</p>
                <p><strong>⏰ Horário:</strong> {c.horario}</p>
              </div>
              <button
                style={styles.button}
                onClick={() => abrirModalGerenciar(c)}
              >
                Gerenciar →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal de criação de consulta */}
      {mostrarModalCriacao && (
        <div style={styles.modalOverlay} onClick={fecharModalCriacao}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>➕ Nova Consulta</h2>
              <button onClick={fecharModalCriacao} style={styles.modalClose}>
                ✕
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.field}>
                <label style={styles.label}>Nome do paciente</label>
                <input
                  className="login-input"
                  style={styles.input}
                  placeholder="Ex: Maria Souza"
                  value={formCriacao.nome}
                  onChange={(e) => setFormCriacao({ ...formCriacao, nome: e.target.value })}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Médico</label>
                <input
                  className="login-input"
                  style={styles.input}
                  placeholder="Ex: Dra. Ana"
                  value={formCriacao.medico}
                  onChange={(e) => setFormCriacao({ ...formCriacao, medico: e.target.value })}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Horário</label>
                <input
                  className="login-input"
                  style={styles.input}
                  placeholder="Ex: 15/04 09:30"
                  value={formCriacao.horario}
                  onChange={(e) => setFormCriacao({ ...formCriacao, horario: e.target.value })}
                />
              </div>
            </div>
            <div style={styles.modalActions}>
              <button onClick={fecharModalCriacao} style={styles.cancelButton}>
                Cancelar
              </button>
              <button onClick={handleAdicionarConsulta} style={styles.saveButton}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição/exclusão */}
      {consultaEditando && (
        <div style={styles.modalOverlay} onClick={fecharModalEdicao}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>✏️ Editar Consulta</h2>
              <button onClick={fecharModalEdicao} style={styles.modalClose}>
                ✕
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.field}>
                <label style={styles.label}>Nome do paciente</label>
                <input
                  className="login-input"
                  style={styles.input}
                  value={formEdit.nome}
                  onChange={(e) => setFormEdit({ ...formEdit, nome: e.target.value })}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Médico</label>
                <input
                  className="login-input"
                  style={styles.input}
                  value={formEdit.medico}
                  onChange={(e) => setFormEdit({ ...formEdit, medico: e.target.value })}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Horário</label>
                <input
                  className="login-input"
                  style={styles.input}
                  value={formEdit.horario}
                  onChange={(e) => setFormEdit({ ...formEdit, horario: e.target.value })}
                />
              </div>
            </div>
            <div style={styles.modalActions}>
              <button onClick={handleExcluir} style={styles.deleteButton}>
                🗑️ Excluir
              </button>
              <button onClick={handleSalvarEdicao} style={styles.saveButton}>
                💾 Salvar alterações
              </button>
            </div>
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
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        button:active {
          transform: translateY(1px);
        }
        .login-input::placeholder {
          color: #9ca3af !important;
          opacity: 1;
        }
        .login-input {
          color: #111827 !important;
        }
        .login-input:focus {
          outline: none;
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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
  headerButtons: {
    display: "flex",
    gap: "1rem",
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
  addButton: {
    background: "#10b981",
    border: "none",
    color: "white",
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
    background: "#10b981",
    color: "white",
    borderRadius: "40px",
    textDecoration: "none",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
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
    color: "#0f172a",
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
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#0f172a",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "0.95rem",
    backgroundColor: "#ffffff",
    transition: "all 0.2s",
    color: "#111827",
  },
  modalActions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
  },
  deleteButton: {
    padding: "0.6rem 1.2rem",
    borderRadius: "40px",
    border: "none",
    background: "#ef4444",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.2s",
  },
  saveButton: {
    padding: "0.6rem 1.2rem",
    borderRadius: "40px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.2s",
  },
  cancelButton: {
    padding: "0.6rem 1.2rem",
    borderRadius: "40px",
    border: "1px solid #cbd5e1",
    background: "white",
    color: "#475569",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.2s",
  },
};

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