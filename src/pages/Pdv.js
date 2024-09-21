import './Pdv.css';
import ArtItens from '../components/artItems/ArtItens.js';
import ArtProducts from '../components/artProduct/ArtProduct.js';
import ArtTotal from '../components/artTotal/ArtTotal.js';
import SearchProducts from '../components/modais/searchProducts/ModalSearchProducts.js'
import SearchOrder from '../components/modais/searchOrder/ModalSearchOrder.js';
import ModalWeightProduct from '../components/modais/weightProducts/ModalWeightProduct.js';
import { useContext, useEffect } from 'react';
import { ModaisContext } from '../contexts/ModaisContext.js';

function Pdv() {
  const {
    state,
    openModalSearchProduct,
    closeModalSearchProduct,
    openModalSearchOrder,
    closeModalSearchOrder,
    closeModalWeightProduct
  } = useContext(ModaisContext);

  const keysOpenModalSearchProduct = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',  // Números
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
    'u', 'v', 'w', 'x', 'y', 'z',                      // Letras minúsculas
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
    'U', 'V', 'W', 'X', 'Y', 'Z'                       // Letras maiúsculas
  ];

  // useEffect para adicionar a escuta de keydown na tela
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (keysOpenModalSearchProduct.includes(event.key) && !state.modalSearchProduct && !state.modalSearchOrder) {
        openModalSearchProduct();
      } else if ((event.key === 'F4') && !state.modalSearchOrder && !state.modalSearchProduct && !state.ModalWeightProduct) {
        openModalSearchOrder();
      } else if (event.key === 'Escape') {
        if (state.modalSearchProduct && !state.ModalWeightProduct) {
          closeModalSearchProduct()
        } else if (state.modalSearchOrder) {
          closeModalSearchOrder();
        } else if (state.ModalWeightProduct) {
          closeModalWeightProduct();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [
    state,
    keysOpenModalSearchProduct,
    openModalSearchProduct,
    closeModalSearchProduct,
    openModalSearchOrder,
    closeModalSearchOrder,
    closeModalWeightProduct
  ])

  return (
    <>
      <section className='widget-grid'>
        <ArtItens />
        <ArtProducts />
        <ArtTotal />
      </section>
      <SearchProducts />
      <SearchOrder />
      <ModalWeightProduct />
    </>
  )
}

export default Pdv;