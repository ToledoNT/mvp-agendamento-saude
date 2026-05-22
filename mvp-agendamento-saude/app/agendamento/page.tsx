"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useAgendamento } from "../hook/use-agendamento";

import { AgendamentoForm } from "../components/consultas/AgendamentoForm";

export default function Agendamento() {
  const router = useRouter();

  const {
    agendarConsulta,
    loading,
  } = useAgendamento();

  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [
    especialidade,
    setEspecialidade,
  ] = useState("");

  const [medico, setMedico] =
    useState("");

  const [data, setData] =
    useState("");

  const [horario, setHorario] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !nome ||
      !email ||
      !especialidade ||
      !medico ||
      !data ||
      !horario
    ) {
      alert(
        "Preencha todos os campos"
      );

      return;
    }

    try {
      await agendarConsulta({
        nome,

        email,

        medico,

        specialty:
          especialidade,

        date: data,

        time: horario,

        status: "AGENDADO",
      });

      router.push(
        "/consultas"
      );
    } catch (error) {
      console.error(
        "Erro ao agendar:",
        error
      );

      alert(
        "Erro ao realizar agendamento. Tente novamente."
      );
    }
  }

  return (
    <>
      <main style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1
              style={styles.title}
            >
              📅 Agendar Consulta
            </h1>

            <p
              style={
                styles.subtitle
              }
            >
              Preencha os dados
              abaixo para realizar
              o agendamento
            </p>
          </div>
        </div>

        <div
          style={
            styles.cardWrapper
          }
        >
          <div style={styles.card}>
            <AgendamentoForm
              nome={nome}
              email={email}
              especialidade={
                especialidade
              }
              medico={medico}
              data={data}
              horario={horario}
              loading={loading}
              setNome={setNome}
              setEmail={setEmail}
              setEspecialidade={
                setEspecialidade
              }
              setMedico={
                setMedico
              }
              setData={setData}
              setHorario={
                setHorario
              }
              onSubmit={
                handleSubmit
              }
              styles={styles}
            />
          </div>
        </div>
      </main>

      <style jsx>{`
        input::placeholder {
          color: #9ca3af;
          opacity: 1;
        }

        input {
          color: #111827;
        }

        input:focus {
          outline: none;

          border-color: #2563eb !important;

          box-shadow: 0 0 0 3px
            rgba(
              37,
              99,
              235,
              0.1
            );

          transition: all 0.2s
            ease;
        }

        button {
          transition: all 0.2s
            ease;
        }

        button:hover:not(
            :disabled
          ) {
          transform: translateY(
            -1px
          );

          box-shadow: 0 4px 8px
            rgba(
              0,
              0,
              0,
              0.1
            );
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

    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },

  header: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems:
      "flex-start",

    marginBottom: "2rem",

    paddingBottom: "1rem",

    borderBottom:
      "2px solid rgba(37, 99, 235, 0.2)",
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

  cardWrapper: {
    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",
  },

  card: {
    width: "100%",

    maxWidth: "520px",

    background: "#ffffff",

    padding: "2rem",

    borderRadius: "24px",

    border:
      "1px solid rgba(203, 213, 225, 0.4)",

    boxShadow:
      "0 20px 35px -10px rgba(0, 0, 0, 0.1)",
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

    backgroundColor:
      "#ffffff",

    color: "#111827",

    fontSize: "0.95rem",

    transition:
      "all 0.2s ease",
  },

  button: {
    marginTop: "0.5rem",

    padding: "0.85rem 1rem",

    borderRadius: "40px",

    border: "none",

    background: "#2563eb",

    color: "#ffffff",

    fontWeight: 600,

    fontSize: "1rem",

    cursor: "pointer",
  },
};