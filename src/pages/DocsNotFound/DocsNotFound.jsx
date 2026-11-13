import { Link, useLocation } from "react-router";
import p from "../pagini.module.css";

// 404 doar pentru URL-urile invalide de sub /docs/ (sidebar-ul rămâne vizibil)
export default function DocsNotFound() {
  const { pathname } = useLocation();

  return (
    <div className={`card ${p.centrat}`} style={{ margin: 0, maxWidth: "none" }}>
      <div className={p.iconMare}>⚠</div>
      <h1>404 în documentație</h1>
      <p className="muted">
        Adresa <code>{pathname}</code> nu corespunde niciunei secțiuni sau pagini.
        Folosește cuprinsul din stânga pentru a găsi ce cauți.
      </p>
      <div className={p.actiuni}>
        <Link to="/docs" className="btn btn-primary">
          Prezentarea documentației
        </Link>
      </div>
    </div>
  );
}
