import { useRef, useState } from "react"
import checkMark from "../assets/check-mark.png";
import edit from "../assets/edit.png";

function Kinkekaart() {
  const [summa, setSumma] = useState(20);
  const [kogus, setKogus] = useState(1);
  const [n2itaInputi, setN2itaInputi] = useState(false); 
  const [customSumma, setCustomSumma] = useState(false); 
  const summaRef = useRef();

  const customSummaHandler = () => {
    setSumma(summaRef.current.value);
    setCustomSumma(true)
  }

  return (
    <div>
      <button className={summa === 20 ? "sum-active": "sum"} onClick={() => setSumma(20)}>20 €</button>
      <button className={summa === 50 ? "sum-active": "sum"} onClick={() => setSumma(50)}>50 €</button>
      <button className={summa === 100 ? "sum-active": "sum"} onClick={() => setSumma(100)}>100 €</button>
      {!n2itaInputi && !customSumma && <span onClick={() => setN2itaInputi(true)}>
        <img src={edit} className="icon" alt="" />
        <span>Valin ise summa</span>
      </span>}
      {n2itaInputi && !customSumma && <span>
        <input ref={summaRef} type="text" />
        <img onClick={() => customSummaHandler()} src={checkMark} className="icon" alt="" />
      </span>}
      {n2itaInputi && customSumma && <span>
        <button onClick={() => setCustomSumma(false)} className="sum-active">{summa} €</button>
      </span>}

      <br /><br />
      Kinkekaart {summa} €
      <br /><br />
      <button disabled={kogus === 1} onClick={() => setKogus(kogus - 1)}>-</button>
      <span>{kogus}</span>
      <button onClick={() => setKogus(kogus + 1)}>+</button>
      <br /><br />
      <div>Kogusumma: {summa * kogus}€</div>
    </div>
  )
}

export default Kinkekaart