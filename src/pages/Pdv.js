import './Pdv.css';
import ArtItens from '../components/artItems/ArtItens.js';
import ArtProducts from '../components/artProduct/ArtProduct.js';
import ArtTotal from '../components/artTotal/ArtTotal.js';
import SearchProducts from '../components/searchProducts/SearchProducts.js'
import SearchOrder from '../components/searchOrder/SearchOrder.js';
import ModalWeightProduct from '../components/searchProducts/ModalWeightProduct.js';
import { useEffect, useState } from 'react';
import GetProducts from '../services/GetProducts.js';
import GetOrder from '..//services/GetOrder.js';
import PutOrders from '../services/PutOrders.js';

function Pdv() {
  const [modalSearchProduct, setModalSearchProduct] = useState(false);
  const [modalWeightProductIsOpen, setModalWeightProductIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [listProductsSelected, setListProductsSelected] = useState([]);
  const [isOpenSearchOrder, setIsOpenSearchOrder] = useState(false);
  const [orderSelected, setOrderSelected] = useState();
  const [productToAdd, setProductToAdd] = useState(null);

  const handleWeightConfirm = (weight) => {
    let WeightProduct = weight; // Atualiza o estado com o novo peso
    setModalWeightProductIsOpen(false); // Fecha o modal
    if (productToAdd) {
      addProductToList(productToAdd, WeightProduct)
    }
  }
  const addProductToList = (product, weight) => {
    setListProductsSelected((prevProductsSelected) => {
      const productInList = prevProductsSelected.find((item) => item.Code === product.Code);

      if (productInList) {
        return prevProductsSelected.map((item) => {
          if (item.Code === product.Code) {
            return {
              ...item,
              Quantity: item.Quantity + (product.Unit === 'KG' ? weight : 1),
            };
          }
          return item;
        });
      }

      return [
        ...prevProductsSelected,
        { ...product, Quantity: product.Unit === 'KG' ? weight : 1 },
      ];
    });
    setModalSearchProduct(false);
  };

  const chooseSelectedProduct = async (codeProduct) => {
    for (const product of products) {
      if (product.Code === codeProduct) {
        if (product.Unit === 'KG') {
          setProductToAdd(product); // Salva o produto no estado
          setModalWeightProductIsOpen(true); // Abre o modal para pegar o peso
        } else {
          addProductToList(product, 1); // Produto sem peso
        }
      }
    }
  };

  const releaseOrder = async () => {
    if (orderSelected === undefined) {
      return;
    }
    const numberOrder = await GetOrder(orderSelected);
    await PutOrders(listProductsSelected, numberOrder[0].Code);
    window.location.reload();
  }

  useEffect(() => {
    const handleKeyDown = async (event) => {
      const products = await GetProducts(); // Chamando a função
      if (products) {
        setProducts(products);
      } else {
        console.error('GetProducts retornou undefined');
      }
      if (event.key === 'F2') {
        setModalSearchProduct(true);
        return;
      } else if (event.key === 'Escape') {
        setModalSearchProduct(false);
      } else if (event.key === 'F8') {
        setIsOpenSearchOrder(true);
      } else if (event.key === 'Enter') {
        releaseOrder();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup - Remove o listener quando o componente desmonta
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [orderSelected]);
  
  return (
    <>
      <section className='widget-grid'>
        <ArtItens
          listProductsSelected={listProductsSelected}
          isOpenSearchOrder={isOpenSearchOrder}
          setIsOpenSearchOrder={setIsOpenSearchOrder}
          orderSelected={orderSelected}
          releaseOrder={releaseOrder}
        />
        <ArtProducts />
        <ArtTotal />
      </section>
      {modalSearchProduct ? <SearchProducts products={products} chooseSelectedProduct={chooseSelectedProduct} /> : null}
      <SearchOrder
        isOpenSearchOrder={isOpenSearchOrder}
        setIsOpenSearchOrder={setIsOpenSearchOrder}
        setOrderSelected={setOrderSelected}
      />
      <ModalWeightProduct
        modalWeightProductIsOpen={modalWeightProductIsOpen}
        setModalWeightProductIsOpen={setModalWeightProductIsOpen}
        handleWeightConfirm={handleWeightConfirm}
      />
    </>
  )
}

export default Pdv;