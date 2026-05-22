'use client';

import MedicoCard from './MedicoCard';

interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  email: string;
}

interface MedicosListProps {
  medicos: Medico[] | any;
}

export default function MedicosList({ medicos }: MedicosListProps) {
  const lista = Array.isArray(medicos) ? medicos : [];

  if (lista.length === 0) {
    return <p style={styles.text}>Nenhum médico cadastrado</p>;
  }

  return (
    <div style={styles.grid}>
      {lista.map((medico) => (
        <MedicoCard key={medico.id} medico={medico} />
      ))}
    </div>
  );
}

const styles: any = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem",
  },
  text: {
    color: "#111827",
    marginTop: "0.4rem",
  },
};