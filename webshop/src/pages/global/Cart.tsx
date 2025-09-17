import { useContext, useState } from "react"
import { CartProduct } from "../../models/CartProduct";
import ParcelMachines from "../../components/cart/ParcelMachines";
import Payment from "../../components/cart/Payment";
import { CartSumContext } from "../../context/CartSumContext";
import { calculateCartSum } from "../../util/calculationsUtil";
import { decrement, decrementByAmount, increment, zero } from "../../redux/counterSlice";
import { useAppDispatch } from "../../redux/hooks";
import { decrementDifferentProducts, zero as nullify } from "../../redux/differentProductsSlice";
import styles from "../../css/Cart.module.css";
import minus from "../../assets/minus.png";
import plus from "../../assets/plus.png";
import remove from "../../assets/remove.png";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";


function Cart() {
  const [cart, setCart] = useState<CartProduct[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
  const {setCartSum} = useContext(CartSumContext);
  const {loggedIn} = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const empty = () => {
    setCart([]);
    localStorage.setItem("cart", "[]");
    setCartSum(0);
    dispatch(zero());
    dispatch(nullify());
  }

  const decreaseQuantity = (index: number) => {
    dispatch(decrement());
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      deleteFromCart(index);
    } else {
      updateCart();
    }
  }

  const increaseQuantity = (index: number) => {
    dispatch(increment());
    cart[index].quantity++;
    updateCart();
  }

  const deleteFromCart = (index: number) => {
    dispatch(decrementByAmount(cart[index].quantity));
    dispatch(decrementDifferentProducts());
    cart.splice(index,1);
    updateCart();
  }

  const updateCart = () => {
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSum(calculateCartSum(cart));
  }

  const order = () => {
    fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
      .then(res => res.text()) // .json() tagastus JSON kujul
      .then(link => window.location.href = link) // tagastus String kujul
  }

  // const calculateCartSum = () => {
  //   let sum = 0;
  //   cart.forEach(cartProduct => sum += cartProduct.product.price * cartProduct.quantity);
  //   return sum;
  // }

  return (
    <div>
      {cart.length > 0 && <button onClick={() => empty()}>Empty</button>}
      
      <div className={styles.products}>
        {cart.map((cartProduct, index) => 
          <div className={styles.product} key={cartProduct.product.id}>
            <img className={styles.image} src={cartProduct.product.image} alt="" />
            <div className={styles.title}>{cartProduct.product.title}</div>
            <div className={styles.price}>{cartProduct.product.price.toFixed(2)} €</div>
            <div className={styles.quantity}>
              <img src={minus} className={styles.button} onClick={() => decreaseQuantity(index)} alt="minus button" />
              <div>{cartProduct.quantity} pcs</div>
              <img src={plus} className={styles.button} onClick={() => increaseQuantity(index)} alt="plus button" />
            </div>
            <div className={styles.total}>{(cartProduct.product.price * cartProduct.quantity).toFixed(2)} €</div>
            <img src={remove} className={styles.button} onClick={() => deleteFromCart(index)} alt="delete button" />
          </div>
        )}
      </div>

      {cart.length > 0 ? 
        <div>
          {calculateCartSum(cart).toFixed(2)}
          <ParcelMachines />
          {/* <Payment sum={calculateCartSum(cart)} /> */}
          {loggedIn ? 
            <button onClick={order}>Telli</button> : 
            <Link to="/login">
              <button>Logi sisse</button>
            </Link>  
           }
        </div> :
        <div>Cart is empty</div>
      }
     
    </div>
  )
}

export default Cart