import { ConsultaInterface } from "@/app/interface/consulta-interface";

interface Props {
  consulta?: ConsultaInterface;
  onDetails: () => void;
}

export function ConsultaCard({
  consulta,
  onDetails,
}: Props) {
  if (!consulta) {
    return null;
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.badge}>
          ✅{" "}
          {consulta.status ||
            "Sem status"}
        </span>
      </div>

      <h3 style={styles.name}>
        {consulta.nome ||
          "Paciente não informado"}
      </h3>

      <div style={styles.info}>
        <p>
          <strong>
            👨‍⚕️ Médico:
          </strong>{" "}
          {consulta.medico ||
            "Não informado"}
        </p>

        <p>
          <strong>
            ⏰ Horário:
          </strong>{" "}
          {consulta.horario ||
            "Não informado"}
        </p>
      </div>

      <button
        type="button"
        style={styles.button}
        onClick={onDetails}
      >
        Ver detalhes →
      </button>
    </div>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  card: {
    background: "white",
    padding: "1.8rem",
    borderRadius: "24px",
    boxShadow:
      "0 10px 15px -6px rgba(0, 0, 0, 0.05)",
    border:
      "1px solid rgba(203, 213, 225, 0.4)",
    display: "flex",
    flexDirection: "column",
  },

  cardHeader: {
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
    fontWeight: 700,
    color: "#020617",
    marginBottom: "1rem",
  },

  info: {
    color: "#0f172a",
    marginBottom: "1.5rem",
    flex: 1,
    fontWeight: 500,
  },

  button: {
    width: "100%",
    padding: "0.7rem",
    border: "none",
    borderRadius: "999px",
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
  },
};