import { Link, useParams } from "react-router";
import comentarii from "@data/comentarii.json";
import { formateazaData } from "@utils/docs";
import styles from "./Comentarii.module.css";

export default function Comentarii() {
  const { sectiune, paginaId } = useParams();
  const lista = comentarii[`${sectiune}/${paginaId}`] ?? [];

  return (
    <section className={`card ${styles.panou}`}>
      <div className={styles.antet}>
        <h2>Comentarii ({lista.length})</h2>
        <Link to={`/docs/${sectiune}/${paginaId}`} className={styles.inchide} aria-label="Închide comentariile">
          ✕
        </Link>
      </div>

      {lista.length === 0 ? (
        <p className="muted">Nu există încă niciun comentariu pentru această pagină.</p>
      ) : (
        <ul className={styles.lista}>
          {lista.map((c, i) => (
            <li key={i}>
              <div className={styles.autor}>
                <strong>{c.autor}</strong>
                <span className="muted">{formateazaData(c.data)}</span>
              </div>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
