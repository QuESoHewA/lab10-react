import p from "../pagini.module.css";

export default function Contact() {
  return (
    <>
      <header className={p.antet}>
        <h1>Contact</h1>
        <p>Ai o sugestie sau ai găsit o greșeală în documentație? Scrie-ne.</p>
      </header>
      <div className={`card ${p.bloc}`}>
        <h2>Email</h2>
        <p>
          <a href="mailto:cotaga.dorin@gmail.com">cotaga.dorin@gmail.com</a>
        </p>
        <h2>Resurse externe</h2>
        <ul>
          <li>
            <a href="https://sca.coffee/research" target="_blank" rel="noreferrer">
              Specialty Coffee Association – cercetare
            </a>
          </li>
          <li>
            <a href="https://worldcoffeeresearch.org" target="_blank" rel="noreferrer">
              World Coffee Research
            </a>
          </li>
          <li>
            <a href="https://aeropress.com/pages/how-to-use" target="_blank" rel="noreferrer">
              Instrucțiuni oficiale AeroPress
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
