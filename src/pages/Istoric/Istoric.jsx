import { Link } from "react-router";
import { useIstoric } from "@context/IstoricContext";
import p from "../pagini.module.css";
import styles from "./Istoric.module.css";

const ora = (iso) =>
  new Date(iso).toLocaleString("ro-RO", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Istoric() {
  const { istoric, stergeIstoric } = useIstoric();

  return (
    <>
      <header className={`${p.antet} ${styles.antet}`}>
        <div>
          <h1>Istoric</h1>
          <p>Ultimele 10 pagini vizitate din documentație.</p>
        </div>
        <button
          type="button"
          className="btn"
          onClick={stergeIstoric}
          disabled={istoric.length === 0}
        >
          Șterge istoric
        </button>
      </header>

      {istoric.length === 0 ? (
        <div className={`card ${styles.gol}`}>
          <p>Nu ai vizitat încă nicio pagină din documentație.</p>
          <Link to="/docs" className="btn btn-primary">
            Deschide documentația
          </Link>
        </div>
      ) : (
        <ol className={`card ${styles.lista}`}>
          {istoric.map((intrare) => (
            <li key={intrare.cale}>
              <Link to={intrare.cale} className={styles.intrare}>
                <span className={styles.titlu}>{intrare.titlu}</span>
                <code className={styles.cale}>{intrare.cale}</code>
              </Link>
              <time className="muted" dateTime={intrare.ora}>
                {ora(intrare.ora)}
              </time>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
