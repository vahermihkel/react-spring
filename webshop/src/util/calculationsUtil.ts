import { CartProduct } from "../models/CartProduct";

export const calculateCartSum = (cart: CartProduct[]) => {
  let sum = 0;
  cart.forEach(cartProduct => sum += cartProduct.product.price * cartProduct.quantity);
  return sum;
}

export const calculateCartCount = (cart: CartProduct[]) => {
  let sum = 0;
  cart.forEach(cartProduct => sum += cartProduct.quantity);
  return sum;
}