import { ConsultaInterface } from "@/app/interface/admin-interface";

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
          <h2 style={styles.modalTitle}>
            🔍 Detalhes da Consulta
          </h2>

          <button
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
            {consulta.medico}
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
        </div>

        <button
          onClick={onClose}
          style={styles.modalButton}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}