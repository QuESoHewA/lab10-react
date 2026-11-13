import { Link } from "react-router";
import styles from "./PaginaInexistenta.module.css";

export default function PaginaInexistenta({ mesaj }) {
  return (
    <div className={`card ${styles.box}`}>
      <div className={styles.icon}>⚠</div>
      <h1>Pagina nu există</h1>
      <p className="muted">{mesaj}</p>
      <div className={styles.actiuni}>
        <Link to="/docs" className="btn btn-primary">
          Înapoi la documentație
        </Link>
      </div>
    </div>
  );
}
