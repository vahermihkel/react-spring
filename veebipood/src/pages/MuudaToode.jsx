import { useParams } from "react-router-dom"
import tootedFailist from "../data/tooted.json"
import TooteVorm from "../components/TooteVorm";

// Reacti HOOK. Reacti erikood
// 1. peab olema imporditud
// 2. peab olema funktsionaalne
// 3. peab algama use-eesliidesega
// 4. ei tohi olla funktsiooni sees loodud
// 5. ei tohi olla tingimuslikult loodud

function MuudaToode() {
  const {index} = useParams();
  const leitud = tootedFailist[index];

  if (leitud === undefined) {
    return <div>Toodet ei leitud</div>
  }

  return (
    <div>
      <TooteVorm i={index} toode={leitud} />
    </div>
  )

}

export default MuudaToode