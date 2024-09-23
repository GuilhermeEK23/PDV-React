import { useContext, useEffect, useRef, useState } from "react";
import GetProducts from "../../../services/GetProducts.js";
import Product from "./Product.js";
import "./ModalSearchProducts.css";

import { ProductsContext } from "../../../contexts/ProductsContext.js";
import { ModaisContext } from "../../../contexts/ModaisContext.js";
import { CartContext } from "../../../contexts/CartContext.js";

function ModalSearchProducts() {
  const inputRef = useRef(null);
  const [valueInputSearch, setValueInputSearch] = useState("");
  const { products, setProducts } = useContext(ProductsContext);
  const { state, closeModalSearchProduct, openModalWeightProduct } =
    useContext(ModaisContext);
  const { setCartProducts } = useContext(CartContext);
  const [productSelectedIndex, setProductSelectedIndex] = useState(0);
  const [productSelected, setProductSelected] = useState({});

  console.log("Reendenizou");

  useEffect(() => {
    // Cria e executa logo em seguida uma função dentro do useEffect apenas uma vez para não ficar em loop
    const fetchProducts = async () => {
      const data = await GetProducts();
      setProducts(data); // Define os produtos com o resultado que vem da API
      console.log("chamou a API para pegar os produtos");
    };

    fetchProducts();
  }, [setProducts]);
  // Foca no input apenas quando o componente referenciado estiver montado
  useEffect(() => {
    if (state.modalSearchProduct && inputRef.current) {
      setProductSelectedIndex(0);
      inputRef.current.focus();
    } else {
      setValueInputSearch(""); // Reseta o valor do input quando o modal é fechado
    }
  }, [state.modalSearchProduct]);

  const filteredProducts = valueInputSearch
    ? products.filter(
        (item) =>
          parseInt(item.Code) === parseInt(valueInputSearch) ||
          item.Description.toUpperCase().includes(
            valueInputSearch.toUpperCase()
          )
      )
    : products;

  //useEffect responsável por definir o produto selecionado
  useEffect(() => {
    if (state.modalSearchProduct && filteredProducts.length > 0) {
      setProductSelected(filteredProducts[productSelectedIndex].Code);
    }
  }, [filteredProducts, productSelectedIndex, state.modalSearchProduct]);

  const addProductToCart = (productSelected) => {
    // console.log("produto selecionado:", productSelected);
    const product = products.filter(
      (item) => parseInt(item.Code) === parseInt(productSelected)
    )[0];

    setCartProducts((prevCart) => {
      // Verifica se o produto já está no carrinho antes de adicioná-lo
      const existingProduct = prevCart.find(
        (item) => item.Code === product.Code
      );
      console.log(existingProduct);
      if (existingProduct) {
        return prevCart.map((item) => {
          if (item.Code === existingProduct.Code) {
            if (item.Unit === "KG") {
              openModalWeightProduct(); // Abre o modal de pesagem para produtos em KG
              return item; // Retorna o item sem alterações
            }
            return { ...item, Quantity: item.Quantity + 1 };
          }
          return item;
        });
      }
      return [...prevCart, { ...product, Quantity: 1 }];
    });
  };

  // Função identificar o keyDown enquanto o foco estiver no input e mudar o produto selecionado a depender das teclas ArrowDown e ArrowUp, e adicioner o produto selecionado no Cart caso a tecla seja Enter
  const handleKeyDown = async (event) => {
    console.log(state.modalSearchProduct);
    if (filteredProducts.length === 0) {
      return;
    }
    if (event.key === "ArrowDown") {
      setProductSelectedIndex((prevIndex) => {
        const nextIndex = Math.min(prevIndex + 1, filteredProducts.length - 1);
        return nextIndex;
      });
    } else if (event.key === "ArrowUp") {
      setProductSelectedIndex((prevIndex) => {
        const prev = Math.max(prevIndex - 1, 0);
        return prev;
      });
    } else if (event.key === "Enter" && state.modalSearchProduct) {
      addProductToCart(productSelected);
      closeModalSearchProduct();
    }
  };

  return (
    state.modalSearchProduct && (
      <div onKeyDown={handleKeyDown} className="modal-search-products">
        <div className="content-modal-search-products">
          <div className="product-selection">
            <div className="selection-header">
              <h1>Selecionar</h1>
            </div>
            <div className="selection-body">
              {filteredProducts.map((item, key) => (
                <Product
                  key={key}
                  code={item.Code}
                  description={item.Description}
                  stock={item.RealStock}
                  price={item.SalePrice}
                  productSelected={productSelected}
                />
              ))}
            </div>
            <div className="selection-footer">
              <input
                type="text"
                placeholder="Produto"
                value={valueInputSearch}
                onChange={(e) => setValueInputSearch(e.target.value)}
                ref={inputRef}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalSearchProducts;
