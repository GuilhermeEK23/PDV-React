import { createContext, useState } from "react";

export const OrderContext = createContext();

function OrderProvider ({children}) {
  const [numberOrder, setNumberOrder] = useState();

  return (
    <OrderContext.Provider value={{numberOrder, setNumberOrder}}>
      {children}
    </OrderContext.Provider>
  )
}

export default OrderProvider;