import { useState } from "react"

function Esindused() {
  const [linn, setLinn] = useState("Tallinn");

  return (
    <div>
      <div>Aktiivne linn: {linn}</div>
      <button className={linn === "Tallinn" ? "city-active" : undefined} onClick={() => setLinn("Tallinn")}>Tallinn</button>
      <button className={linn === "Tartu" ? "city-active" : undefined} onClick={() => setLinn("Tartu")}>Tartu</button>
      <button className={linn === "Narva" ? "city-active" : undefined} onClick={() => setLinn("Narva")}>Narva</button>
      <button className={linn === "Pärnu" ? "city-active" : undefined} onClick={() => setLinn("Pärnu")}>Pärnu</button>

      {linn === "Tallinn" &&
      <div>
        <div>Ülemiste</div>
        <div>Rocca al Mare</div>
        <div>Magistrali</div>
        <div>Vesse</div>
        <div>Kristiine</div>
        <div>Järveotsa</div>
      </div>}

      {linn === "Tartu" &&
      <div>
        <div>Raatuse</div>
        <div>Lõunakeskus</div>
      </div>}

      {linn === "Narva" && <div>Fama</div>}

      {linn === "Pärnu" && <div>Port Artur 2</div>}
    </div>
  )
}

export default Esindused