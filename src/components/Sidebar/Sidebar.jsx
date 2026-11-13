import { NavLink } from "react-router";
import { useAcces } from "@context/AccesContext";
import { paginiDinSectiune, sectiuni } from "@utils/docs";
import styles from "./Sidebar.module.css";

const clasaLink = (baza) => ({ isActive }) =>
  isActive ? `${baza} ${styles.activ}` : baza;

const Indicator = ({ isActive }) =>
  isActive ? <span className={styles.bifa} aria-label="pagina curentă">✓</span> : null;

export default function Sidebar({ laNavigare }) {
  const { modPrivat } = useAcces();

  return (
    <nav className={styles.sidebar} aria-label="Cuprinsul documentației">
      {sectiuni.map((s) => (
        <div key={s.id} className={styles.grup}>
          {/* `end` - linkul secțiunii nu rămâne activ pe paginile ei */}
          <NavLink
            to={`/docs/${s.id}`}
            end
            className={clasaLink(styles.sectiune)}
            onClick={laNavigare}
          >
            {({ isActive }) => (
              <>
                <span>
                  {s.privat && !modPrivat ? "🔒" : s.icon} {s.titlu}
                </span>
                <Indicator isActive={isActive} />
              </>
            )}
          </NavLink>

          <ul className={styles.pagini}>
            {paginiDinSectiune(s.id).map((p) => (
              <li key={p.id}>
                <NavLink
                  to={`/docs/${s.id}/${p.id}`}
                  className={clasaLink(styles.pagina)}
                  onClick={laNavigare}
                >
                  {({ isActive }) => (
                    <>
                      <span>{p.titlu}</span>
                      <Indicator isActive={isActive} />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
