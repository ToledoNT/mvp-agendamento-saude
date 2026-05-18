import { ButtonProps } from "@/app/interface/login-interface";

export function Button({
  title,
  onClick,
  loading,
}: ButtonProps) {
  return (
    <button
      type="button"
      style={styles.button}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Carregando..." : title}
    </button>
  );
}

const styles: any = {
  button: {
    padding: "0.75rem",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "2rem",
    fontWeight: 600,
    cursor: "pointer",
  },
};