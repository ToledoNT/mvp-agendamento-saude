import { Props } from "@/app/interface/agendamento-interface";

export function AgendamentoForm({
  nome,
  medico,
  horario,
  loading,
  setNome,
  setMedico,
  setHorario,
  onSubmit,
  styles,
}: Props) {
  return (
    <>
      <form
        onSubmit={onSubmit}
        style={styles.form}
      >
        <div style={styles.field}>
          <label style={styles.label}>
            Nome do paciente
          </label>

          <input
            className="login-input"
            style={styles.input}
            placeholder="Ex: João Silva"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>
            Médico
          </label>

          <input
            className="login-input"
            style={styles.input}
            placeholder="Ex: Dr. Carlos"
            value={medico}
            onChange={(e) =>
              setMedico(e.target.value)
            }
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>
            Horário
          </label>

          <input
            className="login-input"
            style={styles.input}
            placeholder="Ex: 14:00"
            value={horario}
            onChange={(e) =>
              setHorario(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          style={styles.button}
        >
          {loading
            ? "⏳ Agendando..."
            : "✅ Confirmar Agendamento"}
        </button>
      </form>

      <style jsx>{`
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
          box-shadow: 0 0 0 3px
            rgba(37, 99, 235, 0.1);
          transition: all 0.2s ease;
        }

        .submit-button {
          transition: all 0.2s ease;
        }

        .submit-button:hover {
          background-color: #1d4ed8 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px
            rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}