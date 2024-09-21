import { useContext, useEffect, useRef } from "react";
import GetProducts from "../../../services/GetProducts.js";
import Product from './Product.js';
import './ModalSearchProducts.css'

import { ProductsContext } from "../../../contexts/ProductsContext.js";
import { ModaisContext } from "../../../contexts/ModaisContext.js";

function ModalSearchProducts() {
  const inputRef = useRef(null);
  const { state, modalSearchProduct } = useContext(ModaisContext);
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    // Cria e executa logo em seguida uma função dentro do useEffect apenas uma vez para não ficar em loop
    const fetchProducts = async () => {
      const data = await GetProducts();
      setProducts(data); // Define os produtos com o resultado que vem da API
      console.log("chamou a API para pegar os produtos")
    };

    fetchProducts();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.modalSearchProduct, setProducts]);

  return (state.modalSearchProduct &&
    <div className="modal-search-products">
      <div className="content-modal-search-products">
        <div className='product-selection'>
          <div className='selection-header'>
            <h1>Selecionar</h1>
          </div>
          <div className="selection-body">
            {products.map((item, key) => (
              <Product
                key={key}
                code={item.Code}
                description={item.Description}
                stock={item.RealStock}
                price={item.SalePrice}
              />
            ))}
          </div>
          <div className="selection-footer">
            <input
              type="text"
              placeholder='Produto'
              ref={inputRef}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalSearchProducts;