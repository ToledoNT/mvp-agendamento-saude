import { ConsultaInterface } from "@/app/interface/consulta-interface";

interface Props {
  consulta: ConsultaInterface;
  onDetails: () => void;
  styles: any;
}

export function ConsultaCard({
  consulta,
  onDetails,
  styles,
}: Props) {
  return (
    <div className="card-hover" style={styles.card}>
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
          {consulta.horario || "Não informado"}
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