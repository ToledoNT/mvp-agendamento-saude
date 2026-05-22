'use client';

import { useState } from 'react';
import ViewSwitcher from '../components/medico/ViewSwitcher';
import MedicosList from '../components/medico/MedicosList';
import MedicoForm from '../components/medico/MedicoForm';
import { useMedicos } from '../hook/use-medicos';

export default function MedicosPage() {
  const [view, setView] = useState<'list' | 'create'>('list');

  const { medicos, createMedico } = useMedicos();

  const handleCreateMedico = async (data: {
    nome: string;
    especialidade: string;
    email: string;
  }) => {
    await createMedico(data);
    setView('list');
  };

  return (
    <main style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🩺 Painel de Médicos</h1>
        <ViewSwitcher currentView={view} onViewChange={setView} />
      </div>

      {view === 'list' && <MedicosList medicos={medicos} />}

      {view === 'create' && (
        <MedicoForm onSave={handleCreateMedico} />
      )}
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '2rem',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    fontFamily: 'system-ui',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: '1rem',
  },
};