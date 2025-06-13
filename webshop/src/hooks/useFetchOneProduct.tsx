import { useEffect, useState } from "react";
import { Product } from "../models/Product";

function useFetchOneProduct(url: string) {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        if (json.message !== undefined && json.timestamp !== undefined && json.statusCode !== undefined) {
          return;
        } 
        setProduct(json);
      })
  }, [url]);

  return (
    {product, loading}
  )
}

export default useFetchOneProduct