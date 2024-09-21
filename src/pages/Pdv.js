import './Pdv.css';
import ArtItens from '../components/artItems/ArtItens.js';
import ArtProducts from '../components/artProduct/ArtProduct.js';
import ArtTotal from '../components/artTotal/ArtTotal.js';
import SearchProducts from '../components/modais/searchProducts/ModalSearchProducts.js'
import SearchOrder from '../components/modais/searchOrder/ModalSearchOrder.js';
import ModalWeightProduct from '../components/modais/weightProducts/ModalWeightProduct.js';

function Pdv() {
  const keysOpenSearchProduct = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',  // Números
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
    'u', 'v', 'w', 'x', 'y', 'z',                      // Letras minúsculas
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
    'U', 'V', 'W', 'X', 'Y', 'Z'                       // Letras maiúsculas
  ];
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