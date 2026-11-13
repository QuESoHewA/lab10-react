import { createContext, useContext } from "react";

export const AccesContext = createContext(null);

export const useAcces = () => useContext(AccesContext);
