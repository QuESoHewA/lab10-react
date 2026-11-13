import { Navigate, Outlet, useLocation, useParams } from "react-router";
import { useAcces } from "@context/AccesContext";

// Protejează /docs/privat/*: fără mod privat, redirecționează la /login în timpul randării
export default function RutaPrivata() {
  const { sectiune } = useParams();
  const { modPrivat } = useAcces();
  const location = useLocation();

  if (sectiune === "privat" && !modPrivat) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
