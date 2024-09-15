import './Pdv.css';
import ArtItens from '../components/artItems/ArtItens.js';
import ArtProducts from '../components/artProduct/ArtProduct.js';
import ArtTotal from '../components/artTotal/ArtTotal.js';
import SearchProducts from '../components/searchProducts/SearchProducts.js'
import { useEffect, useRef, useState } from 'react';
import GetProducts from '../services/GetProducts.js';

function Pdv() {
  const [modalSearchProduct, setModalSearchProduct] = useState(false);
  const [products, setProducts] = useState({});

  const chooseSelectedProduct = (codeProduct) => {
    products.map((product) => {
      if (product.Code == codeProduct){
        console.log("produto escolhido foi " + product.Description);
      }
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
      if (event.key === 'F2'){
        setModalSearchProduct(true);
        return;
      } else if (event.key === 'Escape'){
        setModalSearchProduct(false);
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
        <ArtItens />
        <ArtProducts />
        <ArtTotal />
      </section>
      {modalSearchProduct ? <SearchProducts products={products} chooseSelectedProduct={chooseSelectedProduct} /> : modalSearchProduct}
    </>
  )
}

export default Pdv;