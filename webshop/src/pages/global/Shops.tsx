import { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Shop } from '../../models/Shop';

function Shops() {
  const [shops, setShops] = useState<Shop[]>([]);
  const url = import.meta.env.VITE_DB_SHOPS_URL || "";

   useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setShops(json || []));
  }, [url]);

  return (
    <div>
      <MapContainer className="map" center={[59.438, 24.753]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shops.map(shop =>  
        <Marker key={shop.latitude + shop.longitude} position={[shop.latitude, shop.longitude]}>
          <Popup>
            {shop.name}. <br /> Avatud {shop.openTime}
          </Popup>
        </Marker>)}
      </MapContainer>
    </div>
  )
}

export default Shops