import { createContext, useState } from "react";
export const ProductsContext = createContext([{}]);

const listProducts = [
  {
    Code: 1,
    Description: "GUARANÁ LATA 350ML",
    SalePrice: 4.50,
    RealStock: 12
  },
  {
    Code: 2,
    Description: "COCA COLA LATA 350ML",
    SalePrice: 5.00,
    RealStock: 10
  }
]

function ProductsProvider({ children }) {
  const [products, setProducts] = useState(listProducts || []);

  return (
    <ProductsContext.Provider value={{products, setProducts}}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider;