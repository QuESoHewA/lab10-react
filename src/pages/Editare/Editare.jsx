import { useNavigate, useParams } from "react-router";
import PaginaInexistenta from "@components/PaginaInexistenta/PaginaInexistenta";
import { gasestePagina, sectiuni } from "@utils/docs";
import styles from "./Editare.module.css";

export default function Editare() {
  const { sectiune, paginaId } = useParams();
  const navigate = useNavigate();
  const pagina = gasestePagina(sectiune, paginaId);

  if (!sectiuni.some((s) => s.id === sectiune)) {
    return <PaginaInexistenta mesaj={`Secțiunea „${sectiune}” nu există în documentație.`} />;
  }
  if (!pagina) {
    return <PaginaInexistenta mesaj={`Pagina „${paginaId}” nu există și nu poate fi editată.`} />;
  }

  const laSalvare = (e) => {
    e.preventDefault();
    // replace: butonul Back nu se mai întoarce în formular
    navigate(`/docs/${sectiune}/${paginaId}`, { replace: true });
  };

  return (
    <form key={`${sectiune}/${paginaId}`} className={`card ${styles.formular}`} onSubmit={laSalvare}>
      <h1>Editare: {pagina.titlu}</h1>

      <label className={styles.camp}>
        <span>Titlu</span>
        <input name="titlu" className="field" defaultValue={pagina.titlu} required />
      </label>

      <label className={styles.camp}>
        <span>Tag-uri (separate prin virgulă)</span>
        <input name="tag-uri" className="field" defaultValue={pagina["tag-uri"].join(", ")} />
      </label>

      <label className={styles.camp}>
        <span>Conținut</span>
        <textarea
          name="continut"
          className="field"
          rows={14}
          defaultValue={pagina.continut}
          required
        />
      </label>

      <div className={styles.actiuni}>
        <button type="button" className="btn" onClick={() => navigate(-1)}>
          Anulează
        </button>
        <button type="submit" className="btn btn-primary">
          Salvează
        </button>
      </div>
    </form>
  );
}
