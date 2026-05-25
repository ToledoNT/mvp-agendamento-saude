import { Props } from "@/app/interface/agendamento-interface";

export function AgendamentoForm({
  nome,
  email,
  medico,
  data,
  horario,
  horariosDisponiveis,
  medicosDisponiveis,
  loading,
  setNome,
  setEmail,
  setMedico,
  setEspecialidade,
  setData,
  setHorario,
  onSubmit,
  styles,
}: Props) {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      
      {/* NOME */}
      <div style={styles.field}>
        <label style={styles.label}>Nome do paciente *</label>
        <input
          style={styles.input}
          placeholder="Ex: João Silva"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      {/* EMAIL */}
      <div style={styles.field}>
        <label style={styles.label}>E-mail *</label>
        <input
          style={styles.input}
          type="email"
          placeholder="paciente@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* MÉDICO */}
      <div style={styles.field}>
        <label style={styles.label}>Médico *</label>

        <select
          style={styles.input}
          value={medico}
          onChange={(e) => {
            const medicoSelecionado = medicosDisponiveis.find(
              (m) => m.nome === e.target.value
            );

            setMedico(e.target.value);

            // 🔥 AQUI ESTÁ A CORREÇÃO
            setEspecialidade(
              medicoSelecionado?.especialidade || ""
            );
          }}
          required
        >
          <option value="">Selecione um médico</option>

          {medicosDisponiveis?.map((m) => (
            <option
              key={m.id}
              value={m.nome}
            >
              {m.nome} - {m.especialidade}
            </option>
          ))}
        </select>
      </div>

      {/* DATA */}
      <div style={styles.field}>
        <label style={styles.label}>Data *</label>
        <input
          style={styles.input}
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
      </div>

      {/* HORÁRIO */}
      <div style={styles.field}>
        <label style={styles.label}>Horário *</label>

        <select
          style={styles.input}
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          required
        >
          <option value="">Selecione um horário</option>

          {horariosDisponiveis?.length > 0 ? (
            horariosDisponiveis.map((h) => (
              <option
                key={h._id || h.horario}
                value={h.horario}
              >
                {h.horario}
              </option>
            ))
          ) : (
            <option disabled>
              Nenhum horário disponível
            </option>
          )}
        </select>
      </div>

      {/* BOTÃO */}
      <button
        type="submit"
        style={styles.button}
        disabled={loading}
      >
        {loading
          ? "⏳ Agendando..."
          : "✅ Confirmar Agendamento"}
      </button>
    </form>
  );
}