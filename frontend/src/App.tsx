import { useEffect, useState } from "react";
import { getCryptoList } from "./api/cryptoApi";
import type { CryptoItem } from "./types/crypto";
import CryptoList from "./components/CryptoList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [data, setData] = useState<CryptoItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getCryptoList();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Crypto Tracker</h1>
      <CryptoList items={data} />
    </div>
  );
}
