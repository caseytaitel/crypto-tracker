interface Props {
    children: React.ReactNode;
    onClick?: () => void;
  }
  
  export function Button({ children, onClick }: Props) {
    return (
      <button
        onClick={onClick}
        style={{
          padding: "6px 12px",
          background: "#333",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {children}
      </button>
    );
  }
  