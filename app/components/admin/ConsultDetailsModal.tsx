'use client';

export interface Consulta {
  id?: string;
  nome: string;
  email: string;
  medico?: string;
  specialty: string;
  date: string;
  horario: string;
  status: string;
}

interface ConsultaDetailsModalProps {
  consulta: Consulta;
  onClose: () => void;
}

export function ConsultaDetailsModal({
  consulta,
  onClose,
}: ConsultaDetailsModalProps) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            📋 Detalhes da Consulta
          </h2>

          <button
            onClick={onClose}
            style={styles.close}
          >
            ✖
          </button>
        </div>

        <div style={styles.content}>
          <p style={styles.text}>
            <strong>Paciente:</strong>{" "}
            {consulta.nome}
          </p>

          <p style={styles.text}>
            <strong>Email:</strong>{" "}
            {consulta.email}
          </p>

          <p style={styles.text}>
            <strong>Médico:</strong>{" "}
            {consulta.medico || "Não informado"}
          </p>

          <p style={styles.text}>
            <strong>Especialidade:</strong>{" "}
            {consulta.specialty}
          </p>

          <p style={styles.text}>
            <strong>Data:</strong>{" "}
            {consulta.date}
          </p>

          <p style={styles.text}>
            <strong>Horário:</strong>{" "}
            {consulta.horario}
          </p>

          <p style={styles.text}>
            <strong>Status:</strong>{" "}
            {consulta.status}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },

  modal: {
    background: "#fff",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "500px",
    padding: "1.5rem",
    color: "#000", 
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },

  title: {
    color: "#000", 
    fontWeight: 700,
  },

  close: {
    border: "none",
    background: "transparent",
    fontSize: "1.2rem",
    cursor: "pointer",
    color: "#000",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    color: "#000", 
  },

  text: {
    color: "#000",
  },
};