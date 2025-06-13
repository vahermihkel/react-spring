import { Product } from "../../models/Product";

interface SortButtonsInterface {
  products: Product[], 
  setProducts: (products: Product[]) => void
}

function SortButtons({products, setProducts}: SortButtonsInterface) {
   const sortAZ = () => {
      products.sort((a,b) => a.title.localeCompare(b.title));
      setProducts(products.slice());
    }
  
    const sortZA = () => {
      products.sort((a,b) => b.title.localeCompare(a.title));
      setProducts(products.slice());
    }
  
    const priceAsc = () => {
      products.sort((a,b) => a.price - b.price);
      setProducts(products.slice());
    }
  
    const priceDesc = () => {
      products.sort((a,b) => b.price - a.price);
      setProducts(products.slice());
    }
  
    const ratingAsc = () => {
      products.sort((a,b) => a.rating.rate - b.rating.rate);
      setProducts(products.slice());
    }
  
    const ratingDesc = () => {
      products.sort((a,b) => b.rating.rate - a.rating.rate);
      setProducts(products.slice());
    }

  return (
    <div>
      <button onClick={sortAZ}>Sort A-Z</button>
      <button onClick={sortZA}>Sort Z-A</button>
      <button onClick={priceAsc}>Sort price asc</button>
      <button onClick={priceDesc}>Sort price desc</button>
      <button onClick={ratingAsc}>Sort rating asc</button>
      <button onClick={ratingDesc}>Sort rating desc</button>
    </div>
  )
}

export default SortButtons