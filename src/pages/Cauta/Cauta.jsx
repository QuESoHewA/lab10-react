import { useEffect, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import { useAcces } from "@context/AccesContext";
import { pagini, sectiuni } from "@utils/docs";
import p from "../pagini.module.css";
import styles from "./Cauta.module.css";

const normalizeaza = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Cauta() {
  // Sursa de adevăr pentru toate filtrele este URL-ul
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const sectiune = searchParams.get("sectiune") ?? "";
  const taguri = searchParams.getAll("tag");

  const { modPrivat } = useAcces();
  const location = useLocation();
  const inputRef = useRef(null);

  // Focus pe câmp când se ajunge aici prin Ctrl+K
  useEffect(() => {
    if (location.state?.focus) inputRef.current?.focus();
  }, [location.key, location.state]);

  const modifica = (schimbare) =>
    setSearchParams(
      (curente) => {
        const noi = new URLSearchParams(curente);
        schimbare(noi);
        return noi;
      },
      { replace: true }
    );

  const laTastare = (e) => {
    const valoare = e.target.value;
    modifica((params) => (valoare ? params.set("q", valoare) : params.delete("q")));
  };

  const laSectiune = (e) => {
    const valoare = e.target.value;
    modifica((params) =>
      valoare ? params.set("sectiune", valoare) : params.delete("sectiune")
    );
  };

  const adaugaTag = (e) => {
    e.preventDefault();
    const tag = new FormData(e.currentTarget).get("tag");
    if (tag && !taguri.includes(tag)) modifica((params) => params.append("tag", tag));
  };

  const reseteaza = () => setSearchParams({});

  const toateTagurile = [...new Set(pagini.flatMap((pg) => pg["tag-uri"]))].sort((a, b) =>
    a.localeCompare(b, "ro")
  );
  const taguriDisponibile = toateTagurile.filter((t) => !taguri.includes(t));

  const termen = normalizeaza(q.trim());
  const rezultate = pagini.filter(
    (pg) =>
      (!sectiune || pg.sectiune === sectiune) &&
      taguri.every((t) => pg["tag-uri"].includes(t)) &&
      (!termen ||
        normalizeaza(`${pg.titlu} ${pg.continut} ${pg["tag-uri"].join(" ")}`).includes(termen))
  );

  const areFiltre = q || sectiune || taguri.length > 0;

  return (
    <>
      <header className={p.antet}>
        <h1>Căutare</h1>
        <p>
          Filtrele sunt salvate în adresa paginii, așa că poți reîncărca pagina sau
          trimite linkul altcuiva. Apasă <kbd>Ctrl K</kbd> oriunde pentru a reveni aici.
        </p>
      </header>

      <div className={`card ${styles.filtre}`}>
        <input
          ref={inputRef}
          type="search"
          className={`field ${styles.input}`}
          placeholder="Caută după titlu, conținut sau tag…"
          aria-label="Text căutat"
          value={q}
          onChange={laTastare}
        />

        <div className={styles.rand}>
          <label className={styles.eticheta}>
            Secțiune
            <select className="field" value={sectiune} onChange={laSectiune}>
              <option value="">Toate secțiunile</option>
              {sectiuni.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.titlu}
                </option>
              ))}
            </select>
          </label>

          <form className={styles.eticheta} onSubmit={adaugaTag}>
            Tag
            <div className={styles.adaugaTag}>
              <select name="tag" className="field" aria-label="Alege un tag">
                {taguriDisponibile.map((t) => (
                  <option key={t} value={t}>
                    #{t}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="btn"
                disabled={taguriDisponibile.length === 0}
              >
                Adaugă tag
              </button>
            </div>
          </form>

          <button
            type="button"
            className={`btn ${styles.reset}`}
            onClick={reseteaza}
            disabled={!areFiltre}
          >
            Resetează filtrele
          </button>
        </div>

        {taguri.length > 0 && (
          <div className={styles.activi}>
            <span className="muted">Tag-uri active:</span>
            {taguri.map((t) => (
              <span key={t} className="tag">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className={styles.numar}>
        {areFiltre ? `${rezultate.length} rezultate` : `Toate paginile (${rezultate.length})`}
      </p>

      {rezultate.length === 0 ? (
        <div className={`card ${styles.gol}`}>
          Nicio pagină nu corespunde filtrelor alese. Încearcă alt termen sau elimină
          câteva tag-uri.
        </div>
      ) : (
        <ul className={styles.rezultate}>
          {rezultate.map((pg) => {
            const s = sectiuni.find((x) => x.id === pg.sectiune);
            return (
              <li key={`${pg.sectiune}/${pg.id}`}>
                <Link to={`/docs/${pg.sectiune}/${pg.id}`} className={`card ${styles.rezultat}`}>
                  <span className={styles.sectiune}>
                    {s.privat && !modPrivat ? "🔒" : s.icon} {s.titlu}
                  </span>
                  <strong>{pg.titlu}</strong>
                  <span className={styles.extras}>{pg.continut.slice(0, 150)}…</span>
                  <span className={p.taguri}>
                    {pg["tag-uri"].map((t) => (
                      <span key={t} className="tag">
                        #{t}
                      </span>
                    ))}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
