import { useEffect, useRef, useState } from 'react';
import Product from './Product.js';
import './SearchProducts.css'

function SearchProducts({ products, chooseSelectedProduct, modalSearchProduct, keyHandled }) {
  const [searchProduct, setSearchProduct] = useState('');
  const [productSelectedIndex, setProductSelectedIndex] = useState(0);
  const [productSelected, setProductSelected] = useState();
  const [listProducts, setListProducts] = useState(products);
  const inputRef = useRef(null);

  const filterProducts = (e) => {
    setSearchProduct(e);
    const listProducts = products;
    setListProducts(
      listProducts.filter(
        (item) => parseInt(item.Code) === (parseInt(e)) || item.Description.toUpperCase().includes(e.toUpperCase())
      )
    );
  }

  useEffect(() => {
    setSearchProduct(keyHandled);
    inputRef.current.focus();
    filterProducts(keyHandled);
  }, [modalSearchProduct])

  useEffect(() => {
    if (typeof listProducts[0] == "object") {
      setProductSelected(listProducts[productSelectedIndex].Code);
    }
  }, [listProducts, productSelectedIndex])

  const handleKeyDown = async (event) => {
    if (listProducts.length === 0){
      return;
    }
    if (event.key === 'ArrowDown') {
      setProductSelectedIndex((prevIndex) => {
        const nextIndex = Math.min(prevIndex + 1, listProducts.length - 1);
        setProductSelected(listProducts[nextIndex].Code);
        return nextIndex;
      })
    } else if (event.key === 'ArrowUp'){
      setProductSelectedIndex((prevIndex) => {
        const prev = Math.max(prevIndex - 1, 0);
        setProductSelected(listProducts[prev].Code);
        return prev;
      })
    } else if (event.key === 'Enter' && modalSearchProduct){
      chooseSelectedProduct(productSelected)
    }
  };

  if (modalSearchProduct) {
    return (
    <div onKeyDown={handleKeyDown} className="modal-search-products">
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
                setProductSelected={setProductSelected}
              />
            ))}
          </div>
          <div className="selection-footer">
            <input
              ref={inputRef}
              type="text"
              placeholder='Produto'
              value={searchProduct}
              onChange={(e) => { filterProducts(e.target.value) }}
            />
          </div>
        </div>
      </div>
    </div>
  )
  } else {
    return <div ref={inputRef}></div>;
  }
}

export default SearchProducts;