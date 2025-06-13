import { Link } from "react-router-dom"
import { Product as ProductModel } from "../../models/Product"
import { CartProduct } from "../../models/CartProduct";
import { useContext } from "react";
import { CartSumContext } from "../../context/CartSumContext";
import { increment } from "../../redux/counterSlice";
import { useAppDispatch } from "../../redux/hooks";
import { incrementDifferentProducts } from "../../redux/differentProductsSlice";
import styles from "../../css/MainPage.module.css";

function Product({product}: {product: ProductModel}) {
  const {cartSum, setCartSum} = useContext(CartSumContext);
  const dispatch = useAppDispatch();

  const addToCart = (productClicked: ProductModel) => {
    const cart: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex(cartProduct => cartProduct.product.id === productClicked.id);
    if (index >= 0) {
      // kui on ostukorvis, siis suurendan kogust
      cart[index].quantity++;
    } else {
      // kui pole ostukorvis
      cart.push({product: productClicked, quantity: 1});
      dispatch(incrementDifferentProducts());
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSum(cartSum + productClicked.price);
    dispatch(increment());
  }

  return (
    <div className={styles.product}>
      <img className={styles.image} src={product.image} alt="" />
      <div className={styles.title}>{product.title.length > 50 ? product.title.substring(0,50) + "..." : product.title}</div>
      <div className={styles.price}>{product.price.toFixed(2)} €</div>
      <Link to={"/product/" + product.id}>
        <button>Details</button>
      </Link>
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  )
}

export default Product