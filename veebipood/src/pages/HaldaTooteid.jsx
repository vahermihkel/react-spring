import { useState } from "react"
import tootedFailist from "../data/tooted.json";
import { Link } from "react-router-dom";

function HaldaTooteid() {
  const [tooted, setTooted] = useState(tootedFailist);

  const kustuta = (index) => {
    tooted.splice(index,1);
    setTooted(tooted.slice());
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Toote nimi</th>
            <th>Toote hind</th>
            <th>Toote pilt</th>
            <th>Kustuta</th>
            <th>Muuda</th>
          </tr>
        </thead>
        <tbody>
          {tooted.map((toode, index) => 
            <tr key={toode.nimi}>
              <td>{index}</td>
              <td>{toode.nimi}</td>
              <td>{toode.hind}</td>
              <td><img className="icon" src={toode.pilt} alt="" /></td>
              <td> <button onClick={() => kustuta(index)}>x</button> </td>
              <td> 
                <Link to={"/muuda-toode/" + index}>
                  <button>Muuda</button>
                </Link>  
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default HaldaTooteid