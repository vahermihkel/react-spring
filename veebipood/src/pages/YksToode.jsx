import { useParams } from "react-router-dom"
import tootedFailist from "../data/tooted.json"

function YksToode() {
  const {nimi} = useParams();
  //<Route path='/toode/:nimi' element={ <YksToode /> } />
  const leitud = tootedFailist.find(toode => toode.nimi === nimi)

  if (leitud === undefined) {
    return <div>Toodet ei leitud!</div>
  }

  return (
    <div>
      <div>{leitud.nimi}</div>
      <div>{leitud.hind} €</div>
      <img src={leitud.pilt} className="picture" alt="" />
      {!leitud.aktiivne && <i>Toode on mitteaktiivne</i> }
    </div>
  )
}

export default YksToode