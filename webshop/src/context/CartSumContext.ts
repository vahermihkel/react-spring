import { createContext } from "react";

export const CartSumContext = createContext({
  cartSum: 0,
  setCartSum: (cartSum:number) => {console.log(cartSum)}
});

