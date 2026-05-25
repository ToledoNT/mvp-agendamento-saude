'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // 👈 importado

import ViewSwitcher from '../components/medico/ViewSwitcher';
import MedicosList from '../components/medico/MedicosList';
import MedicoForm from '../components/medico/MedicoForm';

import { useMedicos } from '../hook/use-medicos';
import { useHorarios } from '../hook/use-horarios';

import { CreateHorarioData } from '../interface/horario-interface';

export default function MedicosPage() {
  const router = useRouter(); // 👈 hook de navegação
  const [view, setView] = useState<'list' | 'create'>('list');

  const { medicos, createMedico } = useMedicos();

  const {
    horarios,
    createHorarios,
    getHorarios,
    loading,
  } = useHorarios();

  /* =========================
     REF PARA SCROLL NO FORMULÁRIO
  ========================= */
  const formRef = useRef<HTMLDivElement>(null);

  /* =========================
     STATES DO GERADOR
  ========================= */
  const [inicio, setInicio] = useState('08:00');
  const [fim, setFim] = useState('18:00');
  const [intervalo, setIntervalo] = useState(30);
  const [data, setData] = useState('');
  const [medicoSelecionado, setMedicoSelecionado] = useState('');

  /* =========================
     BUSCAR HORÁRIOS NA ENTRADA
  ========================= */
  useEffect(() => {
    getHorarios();
  }, []);

  /* =========================
     SCROLL AUTOMÁTICO QUANDO MUDA PARA CREATE
  ========================= */
  useEffect(() => {
    if (view === 'create' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [view]);

  /* =========================
     GERAR HORÁRIOS
  ========================= */
  const gerarHorarios = async () => {
    try {
      if (!medicoSelecionado) {
        alert('Selecione um médico');
        return;
      }

      if (!data) {
        alert('Selecione uma data');
        return;
      }

      const lista: CreateHorarioData[] = [];

      const [horaInicio, minutoInicio] = inicio.split(':').map(Number);
      const [horaFim, minutoFim] = fim.split(':').map(Number);

      let inicioMinutos = horaInicio * 60 + minutoInicio;
      const fimMinutos = horaFim * 60 + minutoFim;

      while (inicioMinutos <= fimMinutos) {
        const horas = Math.floor(inicioMinutos / 60)
          .toString()
          .padStart(2, '0');
        const minutos = (inicioMinutos % 60)
          .toString()
          .padStart(2, '0');

        lista.push({
          horario: `${horas}:${minutos}`,
          medico: medicoSelecionado,
          data: data,
        });

        inicioMinutos += intervalo;
      }

      await createHorarios(lista);
      await getHorarios();
      alert('Horários gerados com sucesso');
    } catch (error) {
      console.error(error);
      alert('Erro ao gerar horários');
    }
  };

  /* =========================
     CRIAR MÉDICO (CHAMADO PELO FORM)
  ========================= */
  const handleCreateMedico = async (data: {
    nome: string;
    especialidade: string;
    email: string;
  }) => {
    await createMedico(data);
    setView('list');
    // Após salvar, rola suavemente para a lista de médicos
    setTimeout(() => {
      const listElement = document.getElementById('medicos-list-section');
      if (listElement) listElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  /* =========================
     VOLTAR PARA LISTA SEM SALVAR
  ========================= */
  const handleCancelCreate = () => {
    setView('list');
  };

  return (
    <main style={styles.container}>
      {/* HEADER - com botão Voltar */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button onClick={() => router.back()} style={styles.backButton}>
            ← Voltar
          </button>
          <h1 style={styles.title}>🩺 Painel de Médicos</h1>
        </div>
        <ViewSwitcher currentView={view} onViewChange={setView} />
      </div>

      {/* GERADOR DE HORÁRIOS (sempre visível) */}
      <section style={styles.card}>
        <h2 style={styles.subtitle}>⏰ Gerador de Horários</h2>
        <div style={styles.inputs}>
          <div>
            <label style={styles.label}>Médico</label>
            <select
              value={medicoSelecionado}
              onChange={(e) => setMedicoSelecionado(e.target.value)}
              style={styles.select}
            >
              <option value="">Selecione um médico</option>
              {medicos.map((medico) => (
                <option key={medico.id} value={medico.nome}>
                  {medico.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.label}>Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Início</label>
            <input
              type="time"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Fim</label>
            <input
              type="time"
              value={fim}
              onChange={(e) => setFim(e.target.value)}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Intervalo (min)</label>
            <input
              type="number"
              value={intervalo}
              onChange={(e) => setIntervalo(Number(e.target.value))}
              style={styles.input}
            />
          </div>
        </div>
        <button style={styles.button} onClick={gerarHorarios} disabled={loading}>
          {loading ? 'Gerando...' : 'Gerar Horários'}
        </button>

        <h3 style={styles.medicoTitulo}>
          👨‍⚕️ Médico: {medicoSelecionado || 'Nenhum selecionado'}
        </h3>

        {/* HORÁRIOS COM SCROLL */}
        <div style={styles.horariosContainer}>
          {horarios.length === 0 && (
            <p style={styles.emptyText}>Nenhum horário gerado</p>
          )}
          {horarios.map((item, index) => (
            <div
              key={`${item.medico}-${item.horario}-${item.data}-${index}`}
              style={styles.horario}
            >
              <div style={styles.medicoNome}>
                👨‍⚕️ {item.medico || 'Médico não informado'}
              </div>
              <strong style={styles.horarioTexto}>{item.horario}</strong>
              <span style={styles.dataText}>{item.data ?? ''}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO DE MÉDICOS (LISTA OU FORMULÁRIO) */}
      <div id="medicos-list-section" style={styles.medicosSection}>
        {view === 'list' && (
          <>
            <h2 style={styles.subtitle}>📋 Lista de Médicos</h2>
            <MedicosList medicos={medicos} />
          </>
        )}

        {view === 'create' && (
          <div ref={formRef} style={styles.formWrapper}>
            <div style={styles.formCard}>
              <div style={styles.formHeader}>
                <h2 style={styles.subtitle}>➕ Novo Médico</h2>
                <button onClick={handleCancelCreate} style={styles.cancelButton}>
                  ✕ Voltar
                </button>
              </div>
              <MedicoForm onSave={handleCreateMedico} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================
   ESTILOS MELHORADOS
========================= */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    padding: '2rem',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  backButton: {
    background: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '40px',
    padding: '0.5rem 1.2rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#1e293b',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#0f172a',
    margin: 0,
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '24px',
    marginBottom: '2rem',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
    transition: 'box-shadow 0.2s',
  },
  subtitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
    color: '#0f172a',
  },
  inputs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 600,
    color: '#334155',
    fontSize: '0.85rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    background: '#fff',
    color: '#0f172a',
    minWidth: '160px',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontSize: '0.9rem',
  },
  select: {
    padding: '0.75rem',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    background: '#fff',
    color: '#0f172a',
    minWidth: '200px',
    outline: 'none',
    fontSize: '0.9rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '40px',
    background: '#2563eb',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
    transition: 'background 0.2s, transform 0.1s',
    boxShadow: '0 2px 6px rgba(37,99,235,0.3)',
  },
  medicoTitulo: {
    color: '#1e293b',
    marginBottom: '1rem',
    fontSize: '1rem',
    fontWeight: 600,
  },
  horariosContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.8rem',
    marginTop: '0.5rem',
    maxHeight: '400px',
    overflowY: 'auto',
    padding: '0.25rem',
    scrollbarWidth: 'thin',
  },
  horario: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '0.7rem 1rem',
    minWidth: '140px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    color: '#0f172a',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'transform 0.1s',
  },
  medicoNome: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#2563eb',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '0.3rem',
  },
  horarioTexto: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#0f172a',
  },
  dataText: {
    fontSize: '0.7rem',
    color: '#64748b',
    fontWeight: 500,
  },
  emptyText: {
    color: '#94a3b8',
    fontWeight: 500,
    padding: '1rem',
    textAlign: 'center',
  },
  medicosSection: {
    marginTop: '1rem',
  },
  formWrapper: {
    marginTop: '1rem',
    animation: 'fadeInUp 0.3s ease-out',
  },
  formCard: {
    background: '#fff',
    borderRadius: '28px',
    padding: '1.8rem',
    boxShadow: '0 20px 35px -10px rgba(0,0,0,0.15)',
    border: '1px solid rgba(37,99,235,0.1)',
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  cancelButton: {
    background: 'transparent',
    border: '1px solid #cbd5e1',
    borderRadius: '40px',
    padding: '0.5rem 1rem',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: '#475569',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(styleSheet);
}