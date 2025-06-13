import { useEffect, useRef, useState } from "react"
import { Shop } from "../../models/Shop";
import useFetchItems from "../../hooks/useFetchItems";

function ManageShops() {
  const [shops, setShops] = useState<Shop[]>([]);
  const url = import.meta.env.VITE_DB_SHOPS_URL || "";
  const nameRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const longRef = useRef<HTMLInputElement>(null);
  const openTimeRef = useRef<HTMLInputElement>(null);
  const dbShops = useFetchItems(url);

  useEffect(() => {
    setShops(dbShops);
  }, [dbShops]);

  const addShop = () => {
    if (nameRef.current === null || latRef.current === null ||
      longRef.current === null || openTimeRef.current === null
    ) {
      return;   
    }
    shops.push({
      name: nameRef.current.value,
      latitude: Number(latRef.current.value),
      longitude: Number(longRef.current.value),
      openTime: openTimeRef.current.value
    });
    fetch(url, {method: "PUT", body: JSON.stringify(shops)}).then(
      () => {
        setShops(shops.slice());
        if (nameRef.current === null || latRef.current === null ||
          longRef.current === null || openTimeRef.current === null
        ) {
          return;   
        }
        nameRef.current.value = "";
        latRef.current.value = "";
        longRef.current.value = "";
        openTimeRef.current.value = "";
      }
    )
  }

  const deleteShop = (index: number) => {
    shops.splice(index,1);
    fetch(url, {method: "PUT", body: JSON.stringify(shops)}).then(
      () => {setShops(shops.slice())}
    )
  }

  return (
    <div>
      <label>Shop name</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Shop latitude</label> <br />
      <input ref={latRef} type="number" /> <br />
      <label>Shop longitude</label> <br />
      <input ref={longRef} type="number" /> <br />
      <label>Shop open time</label> <br />
      <input ref={openTimeRef} type="text" /> <br />
      <button onClick={addShop}>Add</button> <br />
      {shops.map((shop, index) => 
        <div key={shop.name}>
          <div>{shop.name}</div>
          <div>{shop.latitude}</div>
          <div>{shop.longitude}</div>
          <div>{shop.openTime}</div>
          <button onClick={() => deleteShop(index)}>x</button>
        </div>)}
    </div>
  )
}

export default ManageShops