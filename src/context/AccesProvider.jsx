import { useState } from "react";
import { AccesContext } from "./AccesContext";

export default function AccesProvider({ children }) {
  const [modPrivat, setModPrivat] = useState(false);

  return (
    <AccesContext.Provider value={{ modPrivat, setModPrivat }}>
      {children}
    </AccesContext.Provider>
  );
}
