import { createContext, useContext } from "react";

export const IstoricContext = createContext(null);

export const useIstoric = () => useContext(IstoricContext);
