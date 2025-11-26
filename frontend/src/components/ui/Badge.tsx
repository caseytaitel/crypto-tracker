export function Badge({
    color,
    children,
  }: {
    color: string;
    children: React.ReactNode;
  }) {
    return (
      <span
        style={{
          backgroundColor: color,
          color: "white",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "0.75rem",
          fontWeight: 600,
          display: "inline-block",
          minWidth: "48px",
          textAlign: "center",
        }}
      >
        {children}
      </span>
    );
  }  
  