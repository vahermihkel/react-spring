import { useState } from "react";
import ostukorvJSON from "../data/ostukorv.json";

function Ostukorv() {
  const [tooted, setTooted] = useState(ostukorvJSON);

  const kustuta = (index) => {
    tooted.splice(index,1);
    setTooted(tooted.slice());
  }

  const arvutaKogusumma = () => {
    let summa = 0;
    tooted.forEach(toode => summa = summa + toode.hind);
    return summa;
  }


  return (
    <div>
      {tooted.map((toode, index) => 
        <div key={index}>
         <div>{toode.nimi}</div>
         <div>{toode.hind} €</div>
         <button onClick={() => kustuta(index)}>x</button>
        </div>
      )}
      <div>Ostukorvi kogusumma: {arvutaKogusumma()} €</div>

    </div>
  )
}

export default Ostukorv