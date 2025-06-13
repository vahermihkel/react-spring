import { useState } from "react"

function Seaded() {
  const [keel, setKeel] = useState("et");

  return (
    <div>
      <div>Hetkel aktiivne keel: {keel}</div>
      <button onClick={() => setKeel("et")}>Eesti keel</button>
      <button onClick={() => setKeel("en")}>English</button>
      <button onClick={() => setKeel("ru")}>Pycckuj</button>
      <button onClick={() => setKeel("es")}>Espanol</button>

      {keel === "et" && <div>Leht on eesti keeles</div>}
      {keel === "en" && <div>Page is in English</div>}
      {keel === "ru" && <div>Страница на русском языке</div>}
      {keel === "es" && <div>La página está en español</div>}
      {keel !== "et" && <div><i>Muud tõlked peale eesti on töös</i></div>}
    </div>
  )
}

export default Seaded