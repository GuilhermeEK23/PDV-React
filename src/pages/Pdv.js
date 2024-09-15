import './Pdv.css';
import ArtItens from '../components/artItems/ArtItens.js';
import ArtProducts from '../components/artProduct/ArtProduct.js';
import ArtTotal from '../components/artTotal/ArtTotal.js';
import SearchProducts from '../components/searchProducts/SearchProducts.js'
import SearchOrder from '../components/searchOrder/SearchOrder.js';
import { useEffect, useState } from 'react';
import GetProducts from '../services/GetProducts.js';

function Pdv() {
  const [modalSearchProduct, setModalSearchProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [listProductsSelected, setListProductsSelected] = useState([]);
  const [isOpenSearchOrder, setIsOpenSearchOrder] = useState(false);
  const [orderSelected, setOrderSelected] = useState();

  const chooseSelectedProduct = (codeProduct) => {
    products.map((product) => {
      if (product.Code === codeProduct) {
        setListProductsSelected((prevProductsSelected) => {
          if (typeof (prevProductsSelected.find((item) => item.Code === codeProduct)) === 'object'){
            return prevProductsSelected.map((item) => {
              if (item.Code === codeProduct){
                return {
                  ...item,
                  "Quantity": item.Quantity + 1
                }
              }
              return item;
            })
          }
          return [
            ...prevProductsSelected,
            { ...product, "Quantity": 1 }
          ]
        })
        setModalSearchProduct(false);
      }
      return null;
    })
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
      } else if (event.key === 'F8'){
        setIsOpenSearchOrder(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup - Remove o listener quando o componente desmonta
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [])
  return (
    <>
      <section className='widget-grid'>
        <ArtItens
          listProductsSelected={listProductsSelected}
          isOpenSearchOrder={isOpenSearchOrder}
          setIsOpenSearchOrder={setIsOpenSearchOrder}
          orderSelected={orderSelected}
        />
        <ArtProducts />
        <ArtTotal />
      </section>
      {modalSearchProduct ? <SearchProducts products={products} chooseSelectedProduct={chooseSelectedProduct} /> : modalSearchProduct}
      <SearchOrder
        isOpenSearchOrder={isOpenSearchOrder}
        setIsOpenSearchOrder={setIsOpenSearchOrder}
        setOrderSelected={setOrderSelected}
      />
    </>
  )
}

export default Pdv;