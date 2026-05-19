import { Props } from "@/app/interface/agendamento-interface";

export function AgendamentoForm({
  nome,
  email,
  especialidade,
  data,
  horario,
  loading,
  setNome,
  setEmail,
  setEspecialidade,
  setData,
  setHorario,
  onSubmit,
  styles,
}: Props) {
  return (
    <>
      <form onSubmit={onSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Nome do paciente *</label>
          <input
            className="login-input"
            style={styles.input}
            placeholder="Ex: João Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>E-mail *</label>
          <input
            className="login-input"
            style={styles.input}
            type="email"
            placeholder="paciente@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Especialidade *</label>
          <input
            className="login-input"
            style={styles.input}
            placeholder="Ex: Cardiologia, Pediatria..."
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Data *</label>
          <input
            className="login-input"
            style={styles.input}
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Horário *</label>
          <input
            className="login-input"
            style={styles.input}
            type="time"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button" style={styles.button} disabled={loading}>
          {loading ? "⏳ Agendando..." : "✅ Confirmar Agendamento"}
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
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          transition: all 0.2s ease;
        }
        .submit-button {
          transition: all 0.2s ease;
        }
        .submit-button:hover:not(:disabled) {
          background-color: #1d4ed8 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}