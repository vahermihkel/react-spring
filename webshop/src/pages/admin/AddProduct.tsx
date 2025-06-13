import ProductForm from "../../components/forms/ProductForm";


function AddProduct() {
  const emptyProduct = {
      title: "",
      price: 0,
      description: "",
      category: {id: 0},
      image: "",
      rating: { rate: 0, count: 0 },
    }

  return (
    <div>
      <ProductForm product={emptyProduct} id={0} />
    </div>
  );
}

export default AddProduct;
