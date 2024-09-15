import { useEffect, useRef, useState } from 'react';
import Product from './Product.js';
import './SearchProducts.css'

function SearchProducts({ products, chooseSelectedProduct }) {
  const [productSelected, setPrductSelected] = useState();
  const [listProducts, setListProducts] = useState(products);
  const inputRef = useRef(null);

  const filterProducts = (e) => {
    const listProducts = products;
    setListProducts(listProducts.filter((item) => parseInt(item.Code) === (parseInt(e)) || item.Description.toUpperCase().includes(e.toUpperCase())));
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  useEffect(() => {
    if (typeof listProducts[0] == "object") {
      setPrductSelected(listProducts[0].Code);
    }
  }, [listProducts])

  return (
    <div className="modal-search-products">
      <div className="content-modal-search-products">
        <div className='product-selection'>
          <div className='selection-header'>
            <h1>Selecionar</h1>
          </div>
          <div className="selection-body">
            {listProducts.map((item, key) => (
              <Product
                key={key}
                code={item.Code}
                description={item.Description}
                stock={item.RealStock}
                price={item.SalePrice}
                productSelected={productSelected}
                chooseSelectedProduct={chooseSelectedProduct}
                setProductSelected={setPrductSelected}
              />
            ))}
          </div>
          <div className="selection-footer">
            <input ref={inputRef} type="text" placeholder='Produto' onChange={(e) => { filterProducts(e.target.value) }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchProducts;