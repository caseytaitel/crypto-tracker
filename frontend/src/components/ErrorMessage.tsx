interface Props {
    message: string;
    onRetry?: () => void;
  }
  
  export default function ErrorMessage({ message, onRetry }: Props) {
    return (
      <div style={{ color: "red" }}>
        <p>{message}</p>
        {onRetry && (
          <button onClick={onRetry} style={{ marginTop: "0.5rem" }}>
            Retry
          </button>
        )}
      </div>
    );
  }
  