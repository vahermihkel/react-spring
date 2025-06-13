import { useEffect, useRef, useState } from "react";
import { Product } from "../../models/Product";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useFetchItems from "../../hooks/useFetchItems";

function ManageProducts() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  // const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const url = import.meta.env.VITE_DB_PRODUCTS_URL || "";
  const searchRef = useRef<HTMLInputElement>(null);
  const dbProducts = useFetchItems(url);

  useEffect(() => {
    setProducts(dbProducts);
  }, [dbProducts]);

  // useEffect(() => {
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(json => {
  //       setProducts(json || []);
  //       setDbProducts(json || []);
  //     })
  // }, [url]);

  const deleteProduct = (productId: number) => {
    if (productId === 0) {
      return;
    }
    const index = products.findIndex(product => product.id === productId);
    products.splice(index,1);
    fetch(url, { method: "PUT", body: JSON.stringify(products) }).then(
      () => {setProducts(products.slice())}
    );
  }

  const searchFromProducts = () => {
    const searchInput = searchRef.current;
    if (searchInput === null) {
      return;
    }
    const result = dbProducts.filter(product => 
      product.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      product.id.toString().includes(searchInput.value)
    );
    setProducts(result);
  }

  return (
    <div>
      <input type="text" ref={searchRef} onChange={searchFromProducts} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t("product.title")}</th>
            <th>{t("product.price")}</th>
            <th>{t("product.description")}</th>
            <th>{t("product.category")}</th>
            <th>{t("product.image")}</th>
            <th>{t("product.rating")}</th>
            <th>{t("product.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => 
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.category.name}</td>
            <td> <img src={product.image} alt="" /> </td>
            <td>{product.rating?.rate} / {product.rating?.count}</td>
            <td>
              <Link to={"/admin/edit-product/" + product.id}>
                <button>Edit</button>
              </Link>
              <button onClick={() => deleteProduct(product.id ? product.id : 0)}>Delete</button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default ManageProducts