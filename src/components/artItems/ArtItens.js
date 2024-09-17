import './ArtItens.css';
import TableProducts from './TableProducts.js';
import Buttons from './Buttons.js';

function ArtItens({listProductsSelected, isOpenSearchOrder, setIsOpenSearchOrder, orderSelected, releaseOrder}) {
  return (
    <article className="itens">
      <div className='content-itens'>
        <TableProducts listProductsSelected={listProductsSelected} />
        <Buttons
          isOpenSearchOrder={isOpenSearchOrder}
          setIsOpenSearchOrder={setIsOpenSearchOrder}
          orderSelected={orderSelected}
          releaseOrder={releaseOrder}
        />
      </div>
    </article>
  )
}

export default ArtItens;