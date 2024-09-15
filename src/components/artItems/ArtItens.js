import './ArtItens.css';
import TableProducts from './TableProducts.js';
import Buttons from './Buttons.js';

function ArtItens({listProductsSelected, isOpenSearchOrder, setIsOpenSearchOrder, orderSelected}) {
  return (
    <article className="itens">
      <div className='content-itens'>
        <TableProducts listProductsSelected={listProductsSelected} />
        <Buttons
          listProductsSelected={listProductsSelected}
          isOpenSearchOrder={isOpenSearchOrder}
          setIsOpenSearchOrder={setIsOpenSearchOrder}
          orderSelected={orderSelected}
        />
      </div>
    </article>
  )
}

export default ArtItens;