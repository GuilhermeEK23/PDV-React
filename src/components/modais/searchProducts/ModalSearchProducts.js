import { useContext, useEffect, useRef, useState } from "react";
import GetProducts from "../../../services/GetProducts.js";
import Product from "./Product.js";
import "./ModalSearchProducts.css";

import { ProductsContext } from "../../../contexts/ProductsContext.js";
import { ModaisContext } from "../../../contexts/ModaisContext.js";
import { CartContext } from "../../../contexts/CartContext.js";
import ModalWeightProduct from "../weightProducts/ModalWeightProduct.js";

function ModalSearchProducts() {
  const inputRef = useRef(null);
  const [valueInputSearch, setValueInputSearch] = useState("");
  const { products, setProducts } = useContext(ProductsContext);
  const {
    state,
    closeModalSearchProduct,
    openModalWeightProduct,
    closeModalWeightProduct,
  } = useContext(ModaisContext);
  const { setCartProducts } = useContext(CartContext);
  const [productSelectedIndex, setProductSelectedIndex] = useState(0);
  const [productSelected, setProductSelected] = useState({});
  const [weightPromiseResolver, setWeightPromiseResolver] = useState(null);

  useEffect(() => {
    // Cria e executa logo em seguida uma função dentro do useEffect apenas uma vez para não ficar em loop
    const fetchProducts = async () => {
      const data = await GetProducts();
      setProducts(data || []); // Define os produtos com o resultado que vem da API
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

  const selectProduct = (code) => {
    filteredProducts.find((item, index) => {item.Code === code && setProductSelectedIndex(index)});
  }

  //useEffect responsável por definir o produto selecionado
  useEffect(() => {
    if (state.modalSearchProduct && filteredProducts.length > productSelectedIndex) {
      setProductSelected(filteredProducts[productSelectedIndex].Code);
    }
  }, [filteredProducts, productSelectedIndex, state.modalSearchProduct]);

  // Função para abrir o modalWeightProduct e aguardar a resposta do peso
  const awaitWeightProduct = async () => {
    return new Promise((resolve) => {
      setWeightPromiseResolver(() => resolve);
      openModalWeightProduct();
    });
  };

  const addProductToCart = async (productSelected) => {
    const product = products.filter(
      (item) => parseInt(item.Code) === parseInt(productSelected)
    )[0];

    if (!product){
      return;
    }

    if (product.Unit === "KG") {
      const weight = await awaitWeightProduct();
      if (!weight) return;

      setCartProducts((prevCart) => {
        const existingProduct = prevCart.find(
          (item) => item.Code === product.Code
        );

        if (existingProduct) {
          return prevCart.map((item) => {
            if (item.Code === existingProduct.Code) {
              return { ...item, Quantity: item.Quantity + parseFloat(weight) };
            }
            return item;
          });
        }
        return [...prevCart, { ...product, Quantity: parseFloat(weight) }];
      });
    } else {
      // para produtos que não são por peso
      setCartProducts((prevCart) => {
        // Verifica se o produto já está no carrinho antes de adicioná-lo
        const existingProduct = prevCart.find(
          (item) => item.Code === product.Code
        );

        if (existingProduct) {
          return prevCart.map((item) => {
            if (item.Code === existingProduct.Code) {
              return { ...item, Quantity: item.Quantity + 1 };
            }
            return item;
          });
        }
        return [...prevCart, { ...product, Quantity: 1 }];
      });
    }
    closeModalSearchProduct();
  };

  // Função identificar o keyDown enquanto o foco estiver no input e mudar o produto selecionado a depender das teclas ArrowDown e ArrowUp, e adicioner o produto selecionado no Cart caso a tecla seja Enter
  const handleKeyDown = async (event) => {
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
    }
  };

  const handleConfirmWeight = (weight) => {
    if (weightPromiseResolver) {
      weightPromiseResolver(weight); // Resolve a promessa com o peso
      setWeightPromiseResolver(null); // Limpa o resolver
      closeModalWeightProduct(); // Fecha o modal de peso
    }
  };

  return (
    <>
      {state.modalSearchProduct && (
        <div onKeyDown={handleKeyDown} className="modal-search-products">
          <div className="content-modal-search-products">
            <div className="product-selection">
              <div className="selection-header">
                <h1>Selecionar</h1>
              </div>
              <div className="selection-body">
                {products.length === 0 ? (
                  <h2 style={{ color: "red" }}>
                    Sem produtos ou sem conexão com servidor
                  </h2>
                ) : null}
                {filteredProducts.map((item, key) => (
                  <Product
                    key={key}
                    code={item.Code}
                    description={item.Description}
                    stock={item.RealStock}
                    price={item.SalePrice}
                    productSelected={productSelected}
                    selectProduct={selectProduct}
                    addProductToCart={addProductToCart}
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
      )}

      {state.modalWeightProduct && (
        <ModalWeightProduct onConfirm={handleConfirmWeight} />
      )}
    </>
  );
}

export default ModalSearchProducts;
