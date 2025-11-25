interface Props {
    message: string;
  }
  
  export default function ErrorMessage({ message }: Props) {
    return <div style={{ color: "red" }}>{message}</div>;
  }
  