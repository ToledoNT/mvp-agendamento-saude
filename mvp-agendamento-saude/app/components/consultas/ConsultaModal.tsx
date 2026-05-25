import { ConsultaInterface } from "@/app/interface/consulta-interface";

interface Props {
  consulta: ConsultaInterface;

  onClose: () => void;

  styles: any;
}

export function ConsultaModal({
  consulta,
  onClose,
  styles,
}: Props) {
  return (
    <div
      style={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        style={styles.modalContent}
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div style={styles.modalHeader}>
          <h2
            style={styles.modalTitle}
          >
            🔍 Detalhes da Consulta
          </h2>

          <button
            type="button"
            onClick={onClose}
            style={styles.modalClose}
          >
            ✕
          </button>
        </div>

        <div style={styles.modalBody}>
          <p style={styles.modalBodyP}>
            <strong
              style={
                styles.modalBodyStrong
              }
            >
              👤 Paciente:
            </strong>{" "}
            {consulta.nome}
          </p>

          <p style={styles.modalBodyP}>
            <strong
              style={
                styles.modalBodyStrong
              }
            >
              👨‍⚕️ Médico:
            </strong>{" "}
            {consulta.medico ||
              "Não informado"}
          </p>

          <p style={styles.modalBodyP}>
            <strong
              style={
                styles.modalBodyStrong
              }
            >
              📧 Email:
            </strong>{" "}
            {consulta.email}
          </p>

          <p style={styles.modalBodyP}>
            <strong
              style={
                styles.modalBodyStrong
              }
            >
              🏥 Especialidade:
            </strong>{" "}
            {consulta.specialty}
          </p>

          <p style={styles.modalBodyP}>
            <strong
              style={
                styles.modalBodyStrong
              }
            >
              📅 Data:
            </strong>{" "}
            {consulta.date}
          </p>

          <p style={styles.modalBodyP}>
            <strong
              style={
                styles.modalBodyStrong
              }
            >
              ⏰ Horário:
            </strong>{" "}
            {consulta.horario}
          </p>

          <p style={styles.modalBodyP}>
            <strong
              style={
                styles.modalBodyStrong
              }
            >
              ✅ Status:
            </strong>{" "}
            {consulta.status}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            width: "100%",
            marginTop: "1rem",
            padding: "0.7rem",
            border: "none",
            borderRadius: "40px",
            background: "#2563eb",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}