// import { useEffect, useState } from "react";
// import { Product } from "../../models/Product";
import { useParams } from "react-router-dom";
import useFetchOneProduct from "../../hooks/useFetchOneProduct";

function SingleProduct() {
  const {id} = useParams();
  // const [products, setProducts] = useState<Product[]>([]);
  const url = import.meta.env.VITE_DB_PRODUCTS_URL || "";
  // const products = useFetchProducts(url);
  // const product = products.find(product => product.id === Number(id));
  const {product, loading} = useFetchOneProduct(url + "/" + id);

  // useEffect(() => {
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(json => setProducts(json || []))
  // }, [url]);

  if (loading) {
    return <div>Loading...</div>
  }

  if (product === undefined) {
    return <div>Product not found</div>
  }

  return (
    <div>
      <div>{product?.id}</div>
      <div>{product?.title}</div>
      <div>{product?.price}</div>
      <div>{product?.description}</div>
      <div>{product?.category?.name}</div>
      <div> <img style={{width: "400px"}} src={product?.image} alt="" /> </div>
      {product?.rating && <div>{product?.rating?.rate} / {product?.rating?.count}</div>}
    </div>
  )
}

export default SingleProduct