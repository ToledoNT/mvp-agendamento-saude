'use client';

interface ViewSwitcherProps {
  currentView: 'list' | 'create';
  onViewChange: (view: 'list' | 'create') => void;
}

export default function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div style={styles.actions}>
      <button
        onClick={() => onViewChange('list')}
        style={{
          ...styles.button,
          background: currentView === 'list' ? '#2563eb' : '#e2e8f0',
          color: currentView === 'list' ? 'white' : '#0f172a',
        }}
      >
        👨‍⚕️ Ver médicos
      </button>
      <button
        onClick={() => onViewChange('create')}
        style={{
          ...styles.button,
          background: currentView === 'create' ? '#2563eb' : '#e2e8f0',
          color: currentView === 'create' ? 'white' : '#0f172a',
        }}
      >
        ➕ Cadastrar médico
      </button>
    </div>
  );
}

const styles = {
  actions: {
    display: "flex",
    gap: "1rem",
  },
  button: {
    padding: "0.7rem 1.2rem",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
};