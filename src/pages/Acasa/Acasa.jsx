import { Link } from "react-router";
import { paginiDinSectiune, sectiuni } from "@utils/docs";
import p from "../pagini.module.css";
import styles from "./Acasa.module.css";

export default function Acasa() {

  return (
    <>
      <section className={styles.hero}>
        <span className={styles.eticheta}>Documentație pentru cafea de specialitate</span>
        <h1>Tot ce trebuie să știi pentru o ceașcă de cafea bună</h1>
        <p>
          De la originea boabelor și gradele de prăjire, până la rețete de
          espresso, V60 sau cold brew și alegerea echipamentului potrivit.
        </p>
        <div className={p.actiuni}>
          <Link to="/docs" className="btn btn-primary">
            Deschide documentația
          </Link>
          <Link to="/cauta" className="btn">
            Caută o temă <kbd>Ctrl K</kbd>
          </Link>
        </div>
      </section>

      <h2 className={styles.titluSectiuni}>Secțiuni</h2>
      <div className={p.grila}>
        {sectiuni.map((s) => (
          <Link key={s.id} to={`/docs/${s.id}`} className={`card ${p.cardLink}`}>
            <span className={p.cardIcon}>{s.icon}</span>
            <h3>{s.titlu}</h3>
            <p>{s.descriere}</p>
            <span className={p.meta}>{paginiDinSectiune(s.id).length} pagini →</span>
          </Link>
        ))}
      </div>
    </>
  );
}
