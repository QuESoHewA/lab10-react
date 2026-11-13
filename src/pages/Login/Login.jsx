import { useLocation, useNavigate } from "react-router";
import { useAcces } from "@context/AccesContext";
import p from "../pagini.module.css";

export default function Login() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setModPrivat } = useAcces();

  // ruta cerută inițial, transmisă prin state de <Navigate>
  const destinatie = state?.from?.pathname ?? "/docs/privat";

  const activeaza = () => {
    setModPrivat(true);
    navigate(destinatie, { replace: true });
  };

  return (
    <div className={`card ${p.centrat}`}>
      <div className={p.iconMare}>🔒</div>
      <h1>Mod privat</h1>
      <p className="muted">
        Secțiunea <strong>Note private</strong> este disponibilă doar în modul privat.
        După activare vei fi trimis la <code>{destinatie}</code>.
      </p>
      <div className={p.actiuni}>
        <button type="button" className="btn btn-primary" onClick={activeaza}>
          Activează modul privat
        </button>
      </div>
    </div>
  );
}
