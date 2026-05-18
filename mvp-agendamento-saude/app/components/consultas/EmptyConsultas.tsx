import Link from "next/link";

interface Props {
  styles: any;
}

export function EmptyConsultas({
  styles,
}: Props) {
  return (
    <div
      style={{
        ...styles.empty,
        color: "#0f172a",
      }}
    >
      <h2
        style={{
          color: "#0f172a",
        }}
      >
        Nenhuma consulta encontrada
      </h2>

      <p
        style={{
          color: "#334155",
        }}
      >
        Você ainda não possui
        agendamentos.
      </p>

      <Link
        href="/agendamento"
        style={styles.emptyButton}
      >
        + Agendar consulta
      </Link>
    </div>
  );
}