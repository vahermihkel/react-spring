import { FormEvent, useEffect, useState } from "react";
import { Product } from "../../models/Product";
import { Category } from "../../models/Category";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
// import useFetchItems from "../../hooks/useFetchItems";

function ProductForm(params: {product: Product, id: number}) {
  // const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // const [idUnique, setIdUnique] = useState(true);
  const url = import.meta.env.VITE_DB_PRODUCTS_URL || "";
  const categoriesUrl = import.meta.env.VITE_DB_CATEGORIES_URL || "";
  const [product, setProduct] = useState<Product>(params.product);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(categoriesUrl)
      .then((res) => res.json())
      .then((json) => {
        setCategories(json || [])
        setLoading(false);
      });
  }, [categoriesUrl]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    // if (product.id < 1) {
    //   toast.error("Cannot add ID as negative number!");
    // }
    if (product.title === "") {
      toast.error("Must add title!");
      return;
    }
    if (product.price < 0) {
      toast.error("Cannot add price as negative number!");
      return;
    }
    if (product.category.id === 0) {
      toast.error("Must add category!");
      return;
    }
    if (params.product.title === "" && params.id === 0) {
      // products.push(product);
      makeBackendQuery("POST");
    } else {
      // const index = products.findIndex(product => product.id === params.id);
      // products[index] = product;
      makeBackendQuery("PUT");
    }
  };

  const makeBackendQuery = (method: string) => {
      fetch(url, { 
        method: method, 
        body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("token")
          }
      }).then(
        () => {
          navigate("/admin/manage-products");
        }
      );
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <form>
      {/* {!idUnique && <div>ID is not unique!</div>} */}
      <div>{JSON.stringify(product)}</div>
      {/* <label>ID</label> <br />
      <input onChange={(event) => updateId(Number(event.target.value))} type="text" defaultValue={params.product?.id} /> <br /> */}
      <label>Title</label> <br />
      <input onChange={(event) => setProduct({...product, title: event.target.value})} type="text" defaultValue={params.product?.title} /> <br />
      <label>Price</label> <br />
      <input onChange={(event) => setProduct({...product, price: Number(event.target.value)})} type="text" defaultValue={params.product?.price} /> <br />
      <label>Description</label> <br />
      <input onChange={(event) => setProduct({...product, description: event.target.value})} type="text" defaultValue={params.product?.description} /> <br />
      <label>Category</label> <br />
      {/* <input onChange={(event) => setProduct({...product, category: event.target.value})} type="text" /> <br /> */}
      <select onChange={(event) => setProduct({...product, category: {id: Number(event.target.value)}})} defaultValue={params.product?.category.id}>
        <option disabled value="0">Select category</option>
        {categories.map(category => 
          <option key={category.name} value={category.id}>
            {category.name}
          </option>)}
      </select> <br />
      <label>Image</label> <br />
      <input onChange={(event) => setProduct({...product, image: event.target.value})} type="text" defaultValue={params.product?.image} /> <br />
      <button onClick={(event) => submit(event)}>{params.product.title === "" && params.id === 0 ? "Add" : "Edit"}</button>
      <ToastContainer />
    </form>
  )
}

export default ProductForm