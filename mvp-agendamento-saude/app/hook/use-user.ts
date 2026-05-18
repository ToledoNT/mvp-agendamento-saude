"use client";

import { useEffect, useState } from "react";

interface UserInterface {
  email: string;
  role: string;
}

export function useUser() {
  const [user, setUser] =
    useState<UserInterface | null>(null);

  useEffect(() => {
    const stored =
      localStorage.getItem("user");

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);

      setUser(parsed);
    } catch {
      setUser(null);
    }
  }, []);

  function logout() {
    localStorage.removeItem("user");

    window.location.href = "/";
  }

  return {
    user,
    logout,
    isAdmin: user?.role === "admin",
  };
}