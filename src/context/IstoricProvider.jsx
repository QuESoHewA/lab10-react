import { useCallback, useState } from "react";
import { IstoricContext } from "./IstoricContext";

const LIMITA = 10;

export default function IstoricProvider({ children }) {
  const [istoric, setIstoric] = useState([]);

  const adaugaInIstoric = useCallback((intrare) => {
    setIstoric((curent) =>
      [intrare, ...curent.filter((i) => i.cale !== intrare.cale)].slice(0, LIMITA)
    );
  }, []);

  const stergeIstoric = () => setIstoric([]);

  return (
    <IstoricContext.Provider value={{ istoric, adaugaInIstoric, stergeIstoric }}>
      {children}
    </IstoricContext.Provider>
  );
}
