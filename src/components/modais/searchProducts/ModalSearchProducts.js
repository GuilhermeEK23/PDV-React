import { useContext } from "react";
import Product from './Product.js';
import './ModalSearchProducts.css'

import { ProductsContext } from "../../../contexts/ProductsContext.js";

function ModalSearchProducts(){
  const {products, setProducts} = useContext(ProductsContext);
  console.log(products);

  return (
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
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalSearchProducts;