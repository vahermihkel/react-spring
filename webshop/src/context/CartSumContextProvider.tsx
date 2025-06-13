import { ReactNode, useState } from "react"
import { CartSumContext } from "./CartSumContext"
import { calculateCartSum } from "../util/calculationsUtil";

export const CartSumContextProvider = ({children}: {children: ReactNode}) => {
  const [cartSum, setCartSum] = useState(
    calculateCartSum(JSON.parse(localStorage.getItem("cart") || "[]"))
  );

  // function calculateCartSum() {
  //   const cart: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
  //   let sum = 0;
  //   cart.forEach(cartProduct => sum += cartProduct.product.price * cartProduct.quantity);
  //   return sum;
  // }

  return (
    <CartSumContext.Provider value={{cartSum, setCartSum}}>
      {children}
    </CartSumContext.Provider>
  )
}