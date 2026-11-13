import { Link, useNavigate } from "react-router";
import p from "../pagini.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={`card ${p.centrat}`}>
      <div className={p.iconMare}>☕</div>
      <h1>404 – Pagină negăsită</h1>
      <p className="muted">
        Se pare că această ceașcă e goală. Adresa pe care ai accesat-o nu există.
      </p>
      <div className={p.actiuni}>
        <button type="button" className="btn" onClick={() => navigate(-1)}>
          ← Înapoi
        </button>
        <Link to="/" className="btn btn-primary">
          Acasă
        </Link>
      </div>
    </div>
  );
}
