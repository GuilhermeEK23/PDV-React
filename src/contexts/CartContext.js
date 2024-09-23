import { createContext, useState } from "react";

export const CartContext = createContext([]);

function CartProvider({children}) {
  const [cartProducts, setCartProducts] = useState([]);
  
  return (
    <CartContext.Provider value={{cartProducts, setCartProducts}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;