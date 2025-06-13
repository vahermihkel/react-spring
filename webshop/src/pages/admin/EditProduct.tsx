import { useParams } from "react-router-dom";
import ProductForm from "../../components/forms/ProductForm";
import useFetchOneProduct from "../../hooks/useFetchOneProduct";

function EditProduct() {
  const {id} = useParams();
  const url = import.meta.env.VITE_DB_PRODUCTS_URL || "";
  const {product, loading} = useFetchOneProduct(url + "/" + id);

  if (loading) {
    return <div>Loading...</div>
  }

  if (product === undefined) {
    return <div>Product not found</div>
  }

  return (
    <div>
      <ProductForm product={product} id={Number(id)} />
    </div>
  )
}

export default EditProduct