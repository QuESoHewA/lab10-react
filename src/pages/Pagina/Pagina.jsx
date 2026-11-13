import { Link, Outlet, useMatch, useParams } from "react-router";
import PaginaInexistenta from "@components/PaginaInexistenta/PaginaInexistenta";
import { gasestePagina, paginiDinSectiune, sectiuni } from "@utils/docs";
import comentarii from "@data/comentarii.json";
import styles from "./Pagina.module.css";

export default function Pagina() {
  const { sectiune, paginaId } = useParams();
  const comentariiDeschise = useMatch("/docs/:sectiune/:paginaId/comentarii");

  const dateSectiune = sectiuni.find((s) => s.id === sectiune);
  const pagina = gasestePagina(sectiune, paginaId);

  if (!dateSectiune) {
    return <PaginaInexistenta mesaj={`Secțiunea „${sectiune}” nu există în documentație.`} />;
  }
  if (!pagina) {
    return (
      <PaginaInexistenta
        mesaj={`Pagina „${paginaId}” nu există în secțiunea „${dateSectiune.titlu}”.`}
      />
    );
  }

  // Pagina anterioară / următoare, după ordinea din JSON
  const lista = paginiDinSectiune(sectiune);
  const index = lista.findIndex((p) => p.id === paginaId);
  const anterioara = lista[index - 1];
  const urmatoare = lista[index + 1];

  const baza = `/docs/${sectiune}/${paginaId}`;
  const nrComentarii = comentarii[`${sectiune}/${paginaId}`]?.length ?? 0;

  return (
    <div className={styles.pagina}>
      <article className={`card ${styles.articol}`}>
        <header className={styles.antet}>
          <span className={styles.sectiune}>
            {dateSectiune.icon} {dateSectiune.titlu} · {index + 1} din {lista.length}
          </span>
          <h1>{pagina.titlu}</h1>
          <div className={styles.taguri}>
            {pagina["tag-uri"].map((t) => (
              <span key={t} className="tag">
                #{t}
              </span>
            ))}
          </div>
        </header>

        <div className={`prose ${styles.text}`}>
          {pagina.continut.split(/\n+/).map((paragraf, i) => (
            <p key={i}>{paragraf}</p>
          ))}
        </div>

        <div className={styles.actiuni}>
          <Link to={`${baza}/editare`} className="btn btn-sm">
            ✎ Editează pagina
          </Link>
          <Link to={comentariiDeschise ? baza : `${baza}/comentarii`} className="btn btn-sm">
            {comentariiDeschise ? "Ascunde comentariile" : "Comentarii"} ({nrComentarii})
          </Link>
        </div>

        <nav className={styles.prevNext} aria-label="Navigare între pagini">
          {anterioara ? (
            <Link to={`/docs/${sectiune}/${anterioara.id}`} className={styles.vecin}>
              <span>← Pagina anterioară</span>
              <strong>{anterioara.titlu}</strong>
            </Link>
          ) : (
            <span />
          )}
          {urmatoare && (
            <Link
              to={`/docs/${sectiune}/${urmatoare.id}`}
              className={`${styles.vecin} ${styles.dreapta}`}
            >
              <span>Pagina următoare →</span>
              <strong>{urmatoare.titlu}</strong>
            </Link>
          )}
        </nav>
      </article>

      <aside className={styles.panou}>
        {comentariiDeschise ? (
          <Outlet />
        ) : (
          <div className={`card ${styles.panouGol}`}>
            <p className="muted">
              Comentariile cititorilor se afișează în acest panou.
            </p>
            <Link to={`${baza}/comentarii`} className="btn btn-sm">
              Arată comentariile ({nrComentarii})
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
