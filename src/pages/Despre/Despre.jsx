import p from "../pagini.module.css";

export default function Despre() {
  return (
    <>
      <header className={p.antet}>
        <h1>Despre proiect</h1>
        <p>Un site de documentație despre cafeaua de specialitate.</p>
      </header>
      <div className={`card ${p.bloc}`}>
        <h2>Ce găsești aici</h2>
        <p>
          Ghidul Baristei adună informații practice despre boabele de cafea,
          metodele de preparare și echipamentul necesar, organizate pe
          secțiuni și etichete, ca să găsești rapid ce te interesează.
        </p>
        <h2>Cum este construit</h2>
        <ul>
          <li>React și Vite, cu navigare realizată prin React Router v7;</li>
          <li>conținutul este păstrat local, într-un fișier JSON;</li>
          <li>căutarea folosește parametrii din URL, deci poate fi distribuită prin link;</li>
          <li>secțiunea de note private este accesibilă doar după activarea modului privat.</li>
        </ul>
        <h2>Autor</h2>
        <p>Dorin Cotaga, grupa IAFR2401.</p>
      </div>
    </>
  );
}
