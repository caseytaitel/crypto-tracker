export function Badge({ color, children }: { color: string, children: React.ReactNode }) {
    return (
      <span
        style={{
          backgroundColor: color,
          color: "white",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "0.8rem",
        }}
      >
        {children}
      </span>
    );
  }
  