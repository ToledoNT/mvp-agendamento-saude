"use client";

import Link from "next/link";

interface Props {
  title: string;
  description: string;
  href: string;
}

export function HomeCard({
  title,
  description,
  href,
}: Props) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
      }}
    >
      <div style={styles.card}>
        <h2 style={styles.title}>
          {title}
        </h2>

        <p style={styles.description}>
          {description}
        </p>

        <span style={styles.button}>
          Acessar →
        </span>
      </div>
    </Link>
  );
}

const styles: any = {
  card: {
    background: "white",
    padding: "1.8rem",
    borderRadius: "24px",
    color: "#0f172a",
    boxShadow:
      "0 10px 15px -6px rgba(0,0,0,0.05)",
    border:
      "1px solid rgba(203,213,225,0.4)",
    transition: "0.2s",
    cursor: "pointer",
    height: "100%",
  },

  title: {
    fontSize: "1.4rem",
    fontWeight: 700,
    marginBottom: "0.8rem",
    color: "#0f172a",
  },

  description: {
    color: "#475569",
    marginBottom: "1.5rem",
  },

  button: {
    color: "#2563eb",
    fontWeight: 600,
  },
};