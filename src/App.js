import "./App.css";
import CartProvider from "./contexts/CartContext.js";
import ModaisProvider from "./contexts/ModaisContext.js";
import OrderProvider from "./contexts/OrderContext.js";
import ProductsProvider from "./contexts/ProductsContext.js";
import Pdv from "./pages/Pdv.js";

function App() {
  return (
    <div className="app">
      <div className="content">
        <ProductsProvider>
          <ModaisProvider>
            <CartProvider>
              <OrderProvider>
                <Pdv />
              </OrderProvider>
            </CartProvider>
          </ModaisProvider>
        </ProductsProvider>
      </div>
    </div>
  );
}

export default App;
