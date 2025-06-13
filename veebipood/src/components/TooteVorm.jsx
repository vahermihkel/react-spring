import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import tootedFailist from "../data/tooted.json"

//function TooteVorm({i, toode}) {    i        toode
function TooteVorm(params) { // params.id    ja   params.toode
  const nimiRef = useRef();
  const hindRef = useRef();
  const piltRef = useRef();
  const aktiivneRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const submit = () => {
    if (nimiRef.current.value === "") {
      alert("Nimi puudu!");
      return;
    } 

    if (hindRef.current.value === "") {
      alert("Hind puudu!");
      return;
    } 

    if (hindRef.current.value < 0) {
      alert("Hind negatiivne!");
      return;
    } 

    if (piltRef.current.value === "") {
      alert("Pilt puudu!");
      return;
    } 

    const uusToode = {
      "nimi": nimiRef.current.value,
      "hind": Number(hindRef.current.value),
      "pilt": piltRef.current.value,
      "aktiivne": aktiivneRef.current.checked
    }

    if (params.i === undefined && params.toode === undefined) {
      alert("Edukalt lisatud: " + nimiRef.current.value);
      tootedFailist.push(uusToode);
    } else {
      tootedFailist[params.i] = uusToode;
      //window.location.href = "/halda-tooteid";
      navigate("/halda-tooteid")
    }
  }


  const kontrolli = () => {
    if (nimiRef.current.value[0] === nimiRef.current.value[0]?.toUpperCase()) {
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <div>
      {error && <div>Toote nimi peab olema suure algustähega!</div>}
      <label>Toote nimi</label> <br />
      <input onChange={kontrolli} ref={nimiRef} defaultValue={params.toode?.nimi} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input ref={hindRef} defaultValue={params.toode?.hind} type="number" /> <br />
      <label>Toote pilt</label> <br />
      <input ref={piltRef} defaultValue={params.toode?.pilt} type="text" /> <br />
      <label>Toote aktiivsus</label> <br />
      <input ref={aktiivneRef} defaultChecked={params.toode?.aktiivne} type="checkbox" /> <br />
      <button onClick={submit}>{params.i && params.toode ? "Muuda" : "Lisa"}</button>
    </div>
  )
}

export default TooteVorm