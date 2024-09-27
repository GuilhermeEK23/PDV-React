import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext.js";
import "./ArtTotal.css";

function ArtTotal() {
  const { cartProducts } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  

  useEffect(() => {
    if (cartProducts.length > 0) {
      const totalPrice = cartProducts.reduce(
        (ArtTotal, cartItem) => { return (ArtTotal + cartItem.SalePrice * cartItem.Quantity)}, 0
      );
      setTotal(totalPrice);
    } else {
      setTotal(0);
    }
  }, [cartProducts]);


  return (
    <article className="artTotal">
      <div className="artTotal-content">
        <section>
          <h1>TOTAL</h1>
        </section>
        <section>
          <h1>
            R$ <span>{total.toFixed(2).replace(".",',')}</span>
          </h1>
        </section>
      </div>
    </article>
  );
}

export default ArtTotal;
