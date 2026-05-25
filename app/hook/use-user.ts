"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  role?: string;
  nome?: string;
}

export function useUser() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recupera os dados salvos no login
    const userStr = localStorage.getItem("user");
    const roleSalvo = localStorage.getItem("role");

    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        
        // Pega o role de onde estiver: localStorage separado ou dentro do user
        const role = roleSalvo || userData.role || userData.perfil || "";
        setIsAdmin(role.toLowerCase() === "admin");
        
        console.log("✅ Role detectado:", role, "é admin?", role.toLowerCase() === "admin");
      } catch (error) {
        console.error("Erro ao ler usuário:", error);
        setUser(null);
        setIsAdmin(false);
      }
    } else {
      console.warn("⚠️ Nenhum usuário encontrado no localStorage");
      setUser(null);
      setIsAdmin(false);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return { user, isAdmin, logout, loading };
}