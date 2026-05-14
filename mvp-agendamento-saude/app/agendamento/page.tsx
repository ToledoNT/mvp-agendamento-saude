"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Agendamento() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [medico, setMedico] = useState("");
  const [horario, setHorario] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome || !medico || !horario) {
      alert("Preencha todos os campos");
      return;
    }

    setLoading(true);

    const novaConsulta = {
      nome,
      medico,
      horario,
      status: "Agendado",
    };

    const dados = JSON.parse(localStorage.getItem("consultas") || "[]");
    dados.push(novaConsulta);
    localStorage.setItem("consultas", JSON.stringify(dados));

    setTimeout(() => {
      setLoading(false);
      router.push("/consultas");
    }, 600);
  }

  return (
    <main style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>📅 Agendar Consulta</h1>
          <p style={styles.subtitle}>
            Preencha os dados abaixo para realizar o agendamento
          </p>
        </div>
    </div>

      <div style={styles.cardWrapper}>
        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Nome do paciente</label>
              <input
                className="login-input"
                style={styles.input}
                placeholder="Ex: João Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Médico</label>
              <input
                className="login-input"
                style={styles.input}
                placeholder="Ex: Dr. Carlos"
                value={medico}
                onChange={(e) => setMedico(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Horário</label>
              <input
                className="login-input"
                style={styles.input}
                placeholder="Ex: 14:00 (ou 09/04 14:00)"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-button" style={styles.button}>
              {loading ? "⏳ Agendando..." : "✅ Confirmar Agendamento"}
            </button>
          </form>
        </div>
      </div>
<style jsx>{`
  .login-input::placeholder {
    color: #9ca3af !important;  /* Cinza claro para o placeholder */
    opacity: 1;
  }
  .login-input {
    color: #111827 !important;  /* Texto digitado escuro (quase preto) */
  }
  .login-input:focus {
    outline: none;
    border-color: #2563eb !important;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    transition: all 0.2s ease;
  }
  .submit-button {
    transition: all 0.2s ease;
  }
  .submit-button:hover {
    background-color: #1d4ed8 !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .submit-button:active {
    transform: translateY(0);
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
    marginBottom: "2rem",
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
  cardWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "white",
    padding: "2rem",
    borderRadius: "24px",
    boxShadow: "0 20px 35px -10px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(203, 213, 225, 0.4)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
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
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "40px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
  },
};