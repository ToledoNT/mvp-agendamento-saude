'use client';

import { useState } from 'react';

interface MedicoFormProps {
  onSave: (medico: { nome: string; especialidade: string; email: string }) => void;
}

export default function MedicoForm({ onSave }: MedicoFormProps) {
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !especialidade || !email) {
      alert('Preencha todos os campos');
      return;
    }
    onSave({ nome, especialidade, email });
    setNome('');
    setEspecialidade('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        style={styles.input}
        placeholder="Nome do médico"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Especialidade"
        value={especialidade}
        onChange={(e) => setEspecialidade(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" style={styles.submit}>
        Salvar médico
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "400px",
  } as const,
  input: {
    padding: "0.8rem",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    color: "#111827",
  } as const,
  submit: {
    padding: "0.8rem",
    borderRadius: "999px",
    background: "#2563eb",
    color: "white",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
  } as const,
};