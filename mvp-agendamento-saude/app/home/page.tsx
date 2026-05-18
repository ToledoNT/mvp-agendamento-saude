"use client";

import { HomeCard } from "../components/home/HomeCard";
import { HomeHeader } from "../components/home/HomeHeader";

import { useUser } from "../hook/use-user";

export default function Home() {
  const {
    user,
    logout,
    isAdmin,
  } = useUser();

  return (
    <main style={styles.container}>
      <HomeHeader
        email={user?.email}
        isAdmin={isAdmin}
        onLogout={logout}
      />

      <div style={styles.grid}>
        {!isAdmin && (
          <>
            <HomeCard
              title="📅 Agendar Consulta"
              description="Marque uma nova consulta médica"
              href="/agendamento"
            />

            <HomeCard
              title="📋 Minhas Consultas"
              description="Visualize seus agendamentos"
              href="/consultas"
            />
          </>
        )}

        {isAdmin && (
          <HomeCard
            title="⚙️ Painel Admin"
            description="Gerencie todos os agendamentos"
            href="/admin"
          />
        )}
      </div>
    </main>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    padding: "2rem",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.8rem",
  },
};