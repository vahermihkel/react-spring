import { useState } from "react"
import tootedAndmebaasist from "../data/tooted.json";
import ostukorviFail from "../data/ostukorv.json";
import { Link } from "react-router-dom";

function Avaleht() {
  const [tooted, setTooted] = useState(tootedAndmebaasist);

  const sorteeriAZ = () => {
    tooted.sort((a,b) => a.nimi.localeCompare(b.nimi));
    setTooted(tooted.slice());
    // setTooted([...tooted]);
  }

  const sorteeriZA = () => {
    tooted.sort((a,b) => b.nimi.localeCompare(a.nimi));
    setTooted(tooted.slice());
  }

  const sorteeriTahedKasv = () => {
    tooted.sort((a,b) => a.nimi.length - b.nimi.length);
    setTooted(tooted.slice());
  }

  const sorteeriTahedKah = () => {
    const vastus = tooted.toSorted((a,b) => b.nimi.length - a.nimi.length);
    setTooted(vastus);
  }

  const sorteeriTeineTahtAZ = () => {
    // tooted.sort((a,b) => a.charAt(1).localeCompare(b.charAt(1)));
    // tooted.sort((a,b) => a.at(1).localeCompare(b.at(1)));
    tooted.sort((a,b) => a.nimi[1].localeCompare(b.nimi[1]));
    setTooted(tooted.slice());
  }

  const filtreeri5Tahte = () => {
    const vastus = tootedAndmebaasist.filter(toode => toode.nimi.length === 5);
    setTooted(vastus);
  }

  const filtreeriAgaLoppevad = () => {
    const vastus = tootedAndmebaasist.filter(toode => toode.nimi.endsWith("a"));
    setTooted(vastus);
  }

  const filtreeriTdSisaldavad = () => {
    const vastus = tootedAndmebaasist.filter(toode => toode.nimi.includes("t"));
    setTooted(vastus);
  }

  const filtreeriKolmasTahtC = () => {
    const vastus = tootedAndmebaasist.filter(toode => toode.nimi[2] === "c");
    setTooted(vastus);
  }

  const filtreeriPaarisarvulised = () => {
    const vastus = tootedAndmebaasist.filter(toode => toode.nimi.length % 2 === 0);
    setTooted(vastus);
  }

  const lisaOstukorvi = (toode) => {
    ostukorviFail.push(toode);
  }

  // const fnktMillesOnIf = (kumbTeha) => {
  //   if (kumbTeha) {
  //     return () => lisaOstukorvi();
  //   } else {
  //     return () => filtreeri5Tahte();
  //   }
  // }

  return (
    <div>
      {/* <button onClick={fnktMillesOnIf(true)}>Sorteeri A-Z</button> */}
      <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
      <button onClick={sorteeriZA}>Sorteeri Z-A</button>
      <button onClick={sorteeriTahedKasv}>Sorteeri tähemärgid kasvavalt</button>
      <button onClick={sorteeriTahedKah}>Sorteeri tähemärgid kahanevalt</button>
      <button onClick={sorteeriTeineTahtAZ}>Sorteeri teine täht A-Z</button>
      <br /><br />
      <button onClick={filtreeri5Tahte}>Filtreeri 5 tähelised</button>
      <button onClick={filtreeriAgaLoppevad}>Filtreeri a-ga lõppevad</button>
      <button onClick={filtreeriTdSisaldavad}>Filtreeri t tähte sisaldavad</button>
      <button onClick={filtreeriKolmasTahtC}>Filtreeri kellel kolmas täht c</button>
      <button onClick={filtreeriPaarisarvulised}>Filtreeri paarisarvu tähelised</button>

      
      {tooted.map(toode => 
        <div key={toode.nimi}>
          <img className={toode.aktiivne ? "picture" : "picture inactive"} src={toode.pilt} alt="" />
          <div>{toode.nimi}</div>
          <div>{toode.hind} €</div>
          {toode.aktiivne && <button onClick={() => lisaOstukorvi(toode)}>Lisa ostukorvi</button>}
          <Link to={"/toode/" + toode.nimi}>
            <button>Vt detailsemalt</button>
          </Link>
        </div>)}
    </div>
  )
}

// onClick={() => setKeel("et")} <--- pean tegema
// onClick={() => customSummaHandler()} <--- võin sulud ära jätta
// onClick={lisa} <--- võin sulud panna

//xx onClick={setKeel("et")} <--- ei saa teha
//xx onClick={customSummaHandler()} <--- ei saa teha

export default Avaleht