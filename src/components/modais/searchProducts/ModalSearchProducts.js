import { useContext, useEffect, useRef, useState } from "react";
import GetProducts from "../../../services/GetProducts.js";
import Product from './Product.js';
import './ModalSearchProducts.css'

import { ProductsContext } from "../../../contexts/ProductsContext.js";
import { ModaisContext } from "../../../contexts/ModaisContext.js";

function ModalSearchProducts() {
  const inputRef = useRef(null);
  const [valueInputSearch, setValueInputSearch] = useState('');
  const { state, modalSearchProduct } = useContext(ModaisContext);
  const [productSelectedIndex, setProductSelectedIndex] = useState(0);
  const [productSelected, setProductSelected] = useState();
  const { products, setProducts } = useContext(ProductsContext);
  const [listProducts, setListProducts] = useState(products);

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

  
  useEffect(() => {
    const filterProducts = (e) => {
      setListProducts(
        products.filter(
          (item) => parseInt(item.Code) === (parseInt(e)) || item.Description.toUpperCase().includes(e.toUpperCase())
        )
      );
    }

    filterProducts(valueInputSearch)
  }, [valueInputSearch]);

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
      
    }
  };

  return (state.modalSearchProduct &&
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
              />
            ))}
          </div>
          <div className="selection-footer">
            <input
              type="text"
              placeholder='Produto'
              value={valueInputSearch}
              onChange={(e) => setValueInputSearch(e.target.value)}
              ref={inputRef}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalSearchProducts;