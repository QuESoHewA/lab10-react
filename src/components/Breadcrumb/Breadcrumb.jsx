import { Fragment } from "react";
import { Link, useLocation } from "react-router";
import { etichetaSegment } from "@utils/docs";
import styles from "./Breadcrumb.module.css";

export default function Breadcrumb() {
  const { pathname } = useLocation();

  // ex: "/docs/boabe/procesare/editare" -> ["docs", "boabe", "procesare", "editare"]
  const segmente = pathname.split("/").filter(Boolean);

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol>
        {segmente.map((segment, i) => {
          const cale = "/" + segmente.slice(0, i + 1).join("/");
          const ultimul = i === segmente.length - 1;
          return (
            <Fragment key={cale}>
              {i > 0 && <li className={styles.separator} aria-hidden="true">/</li>}
              <li>
                <Link
                  to={cale}
                  className={ultimul ? styles.curent : styles.link}
                  aria-current={ultimul ? "page" : undefined}
                >
                  {etichetaSegment(segmente, i)}
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
