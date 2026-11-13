import { Link, useParams } from "react-router";
import PaginaInexistenta from "@components/PaginaInexistenta/PaginaInexistenta";
import { paginiDinSectiune, sectiuni } from "@utils/docs";
import p from "../pagini.module.css";

export default function Sectiune() {
  const { sectiune } = useParams();
  const date = sectiuni.find((s) => s.id === sectiune);

  if (!date) {
    return <PaginaInexistenta mesaj={`Secțiunea „${sectiune}” nu există în documentație.`} />;
  }

  const lista = paginiDinSectiune(sectiune);

  return (
    <>
      <header className={p.antet}>
        <h1>
          {date.icon} {date.titlu}
        </h1>
        <p>{date.descriere}</p>
      </header>

      <div className={p.grila}>
        {lista.map((pg, i) => (
          <Link
            key={pg.id}
            to={`/docs/${sectiune}/${pg.id}`}
            className={`card ${p.cardLink}`}
          >
            <span className="muted" style={{ fontSize: "0.8rem", fontWeight: 700 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2>{pg.titlu}</h2>
            <p>{pg.continut.split("\n")[0].slice(0, 110)}…</p>
            <div className={p.taguri} style={{ marginTop: "auto", paddingTop: 6 }}>
              {pg["tag-uri"].map((t) => (
                <span key={t} className="tag">
                  #{t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
