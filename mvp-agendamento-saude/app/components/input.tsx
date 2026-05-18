"use client";

interface Props {
  icon?: string;

  type?: string;

  placeholder: string;

  value: string;

  onChange: (value: string) => void;
}

export function Input({
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <>
      <div style={styles.container}>
        {icon && (
          <span style={styles.icon}>
            {icon}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          style={styles.input}
        />
      </div>

      <style jsx>{`
        input::placeholder {
          color: #9ca3af;
          opacity: 1;
        }

        input:focus {
          outline: none;
        }
      `}</style>
    </>
  );
}

const styles: any = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",

    padding: "0.85rem 1rem",

    borderRadius: "16px",

    border: "1px solid #cbd5e1",

    background: "#ffffff",

    transition: "all 0.2s ease",
  },

  icon: {
    fontSize: "1.1rem",

    color: "#64748b",
  },

  input: {
    width: "100%",

    border: "none",

    outline: "none",

    background: "transparent",

    color: "#111827",

    fontSize: "0.95rem",

    fontWeight: 500,
  },
};