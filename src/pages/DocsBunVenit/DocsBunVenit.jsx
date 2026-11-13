import { Link } from "react-router";
import { useAcces } from "@context/AccesContext";
import { pagini, paginiDinSectiune, sectiuni } from "@utils/docs";
import p from "../pagini.module.css";

export default function DocsBunVenit() {
  const { modPrivat } = useAcces();

  return (
    <>
      <header className={p.antet}>
        <h1>Bun venit în documentație ☕</h1>
        <p>
          {pagini.length} pagini în {sectiuni.length} secțiuni. Alege o secțiune
          din cuprins sau de mai jos, ori caută direct după text și etichete.
        </p>
      </header>

      <div className={p.actiuni} style={{ marginBottom: 24 }}>
        <Link to="/docs/start" className="btn btn-primary">
          Începe cu prima secțiune →
        </Link>
      </div>

      <div className={p.grila}>
        {sectiuni.map((s) => (
          <Link key={s.id} to={`/docs/${s.id}`} className={`card ${p.cardLink}`}>
            <span className={p.cardIcon}>{s.privat && !modPrivat ? "🔒" : s.icon}</span>
            <h2>{s.titlu}</h2>
            <p>{s.descriere}</p>
            <span className={p.meta}>{paginiDinSectiune(s.id).length} pagini →</span>
          </Link>
        ))}
      </div>
    </>
  );
}
