import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Sidebar from "@components/Sidebar/Sidebar";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import { useAcces } from "@context/AccesContext";
import { useIstoric } from "@context/IstoricContext";
import { etichetaSegment } from "@utils/docs";
import styles from "./DocsLayout.module.css";

export default function DocsLayout() {
  const { pathname } = useLocation();
  const { modPrivat } = useAcces();
  const { adaugaInIstoric } = useIstoric();
  const [cuprinsDeschis, setCuprinsDeschis] = useState(false);

  // Înregistrează fiecare pagină vizitată din /docs/* în istoric
  useEffect(() => {
    const segmente = pathname.split("/").filter(Boolean);
    const redirectionare =
      segmente[1] === "start" || (segmente[1] === "privat" && !modPrivat);
    if (redirectionare) return;

    const titlu =
      segmente.length === 1
        ? "Docs"
        : segmente
            .slice(1)
            .map((_, i) => etichetaSegment(segmente, i + 1))
            .join(" / ");
    adaugaInIstoric({ cale: pathname, titlu, ora: new Date().toISOString() });
  }, [pathname, modPrivat, adaugaInIstoric]);

  return (
    <div className={styles.docs}>
      <aside className={styles.sidebar}>
        <button
          type="button"
          className={`btn ${styles.toggle}`}
          aria-expanded={cuprinsDeschis}
          onClick={() => setCuprinsDeschis((d) => !d)}
        >
          ☰ Cuprins {cuprinsDeschis ? "▴" : "▾"}
        </button>
        <div className={cuprinsDeschis ? styles.deschis : styles.inchis}>
          <Sidebar laNavigare={() => setCuprinsDeschis(false)} />
        </div>
      </aside>

      <section className={styles.continut}>
        <Breadcrumb />
        <Outlet />
      </section>
    </div>
  );
}
