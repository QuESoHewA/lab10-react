import { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import styles from "./Layout.module.css";

const LINKURI = [
  { to: "/", eticheta: "Acasă", end: true },
  { to: "/docs", eticheta: "Documentație" },
  { to: "/cauta", eticheta: "Căutare" },
  { to: "/istoric", eticheta: "Istoric" },
  { to: "/despre", eticheta: "Despre" },
  { to: "/contact", eticheta: "Contact" },
];

export default function Layout() {
  const navigate = useNavigate();

  // Ctrl+K (sau Cmd+K) deschide căutarea și focusează câmpul
  useEffect(() => {
    const laTasta = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        navigate("/cauta", { state: { focus: true } });
      }
    };
    window.addEventListener("keydown", laTasta);
    return () => window.removeEventListener("keydown", laTasta);
  }, [navigate]);

  const laCautareRapida = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q").trim();
    e.currentTarget.reset();
    navigate(`/cauta?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.brand}>
            <img src="/favicon.svg" alt="" width="30" height="30" />
            <span>Ghidul Baristei</span>
          </Link>

          <nav className={styles.nav} aria-label="Navigare principală">
            {LINKURI.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.activ}` : styles.navLink
                }
              >
                {l.eticheta}
              </NavLink>
            ))}
          </nav>

          <form className={styles.cautare} onSubmit={laCautareRapida} role="search">
            <input
              name="q"
              type="search"
              className="field"
              placeholder="Caută în docs…"
              aria-label="Căutare rapidă"
            />
            <kbd className={styles.scurtatura}>Ctrl K</kbd>
          </form>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>© 2026 Ghidul Baristei · Dorin Cotaga, IAFR2401</span>
          <span className={styles.externe}>
            Surse:{" "}
            <a href="https://sca.coffee" target="_blank" rel="noreferrer">
              Specialty Coffee Association
            </a>
            {" · "}
            <a href="https://reactrouter.com" target="_blank" rel="noreferrer">
              React Router
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
