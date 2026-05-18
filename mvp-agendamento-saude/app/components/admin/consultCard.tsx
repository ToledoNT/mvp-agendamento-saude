import { ConsultaInterface } from "@/app/interface/admin-interface";

interface Props {
  consulta: ConsultaInterface;
  onDetails: () => void;
}

export function ConsultaCard({
  consulta,
  onDetails,
}: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.badge}>
          ✅ {consulta.status}
        </span>
      </div>

      <h3 style={styles.name}>
        {consulta.nome}
      </h3>

      <div style={styles.info}>
        <p>
          <strong>👨‍⚕️ Médico:</strong>{" "}
          {consulta.medico}
        </p>

        <p>
          <strong>⏰ Horário:</strong>{" "}
          {consulta.horario}
        </p>
      </div>

      <button
        style={styles.button}
        onClick={onDetails}
      >
        Ver detalhes →
      </button>
    </div>
  );
}

const styles: any = {
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
    color: "#0f172a",
    marginBottom: "1rem",
  },

  info: {
    color: "#334155",
    marginBottom: "1.5rem",
    flex: 1,
  },

  button: {
    width: "100%",
    padding: "0.7rem",
    border: "none",
    borderRadius: "999px",
    background: "#2563eb",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  },
};