import { useEffect, useRef, useState } from "react"
import styles from "../../css/ParcelMachines.module.css";

interface ParcelMachine {
  ZIP: string
  NAME: string
  TYPE: string
  A0_NAME: string
  A1_NAME: string
  A2_NAME: string
  A3_NAME: string
  A4_NAME: string
  A5_NAME: string
  A6_NAME: string
  A7_NAME: string
  A8_NAME: string
  X_COORDINATE: string
  Y_COORDINATE: string
  SERVICE_HOURS: string
  TEMP_SERVICE_HOURS: string
  TEMP_SERVICE_HOURS_UNTIL: string
  TEMP_SERVICE_HOURS_2: string
  TEMP_SERVICE_HOURS_2_UNTIL: string
  comment_est: string
  comment_eng: string
  comment_rus: string
  comment_lav: string
  comment_lit: string
  MODIFIED: string
}


function ParcelMachines() {
  const [parcelMachines, setParcelMachines] = useState<ParcelMachine[]>([]);
  const [dbParcelMachines, setDbParcelMachines] = useState<ParcelMachine[]>([]);
  const [country, setCountry] = useState("EE");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(json => {
        setParcelMachines(json);
        setDbParcelMachines(json);
      });
  }, []);

  const searchFromPMs = () => {
    const searchInput = searchRef.current;
    if (searchInput === null) {
      return;
    }
    const result = dbParcelMachines.filter(pm => pm.NAME.toLowerCase().includes(searchInput.value.toLowerCase()));
    setParcelMachines(result);
  }

  return (
    <div>
      <input type="text" ref={searchRef} onChange={searchFromPMs} />
      <button className={country === "EE" ? styles.active: undefined} onClick={() => setCountry("EE")}>EE</button>
      <button className={country === "LV" ? styles.active: undefined} onClick={() => setCountry("LV")}>LV</button>
      <button className={country === "LT" ? styles.active: undefined} onClick={() => setCountry("LT")}>LT</button>
      <select>
        {parcelMachines
          .filter(pm => pm.A0_NAME === country)
          .map(pm => 
          <option key={pm.ZIP}>{pm.NAME}</option>
        )}
      </select>
    </div>
  )
}

export default ParcelMachines