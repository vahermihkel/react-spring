import { useEffect, useState } from "react";
import { Product as ProductModel } from "../../models/Product";
import { Category } from "../../models/Category";
import SortButtons from "../../components/home/SortButtons";
import Product from "../../components/home/Product";
import useFetchItems from "../../hooks/useFetchItems";
import CarouselGallery from "../../components/home/CarouselGallery";
import styles from "../../css/MainPage.module.css";

function MainPage() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  // const [dbProducts, setDbProducts] = useState<ProductModel[]>([]);
  const url = import.meta.env.VITE_DB_PRODUCTS_URL || "";
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryUrl = import.meta.env.VITE_DB_CATEGORIES_URL || "";
 const dbProducts = useFetchItems(url);

  useEffect(() => {
    setProducts(dbProducts);
  }, [dbProducts]);

  useEffect(() => {
    fetch(categoryUrl)
      .then(res => res.json())
      .then(json => setCategories(json || []))
  }, [categoryUrl]);

 

  const filterByCategory = (categoryName: string | undefined) => {
    if (categoryName === undefined) {
      return;
    }
    const result = dbProducts.filter(product => product.category.name === categoryName);
    setProducts(result);
  }

  return (
    <div>
      <CarouselGallery />

      <br /><br />

      <SortButtons products={products} setProducts={setProducts}  />

      <br /><br />

      {categories.map(category => 
        <button key={category.name} onClick={() => filterByCategory(category.name)}>{category.name}</button>
      )}

      <div className={styles.products}>
        {products.map(product => 
          <Product key={product.id} product={product} />
          )}
      </div>
    </div>
  )
}

export default MainPage