'use client';

interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  email: string;
}

interface MedicoCardProps {
  medico: Medico;
}

export default function MedicoCard({ medico }: MedicoCardProps) {
  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{medico.nome}</h3>
      <p style={styles.text}>🏥 {medico.especialidade}</p>
      <p style={styles.text}>📧 {medico.email}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "1.5rem",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#0f172a",
  },
  text: {
    color: "#111827",
    marginTop: "0.4rem",
  },
};