import './ArtItens.css';
import TableProducts from './TableProducts.js';
import Buttons from './Buttons.js';

function ArtItens({releaseOrder}) {
  return (
    <article className="itens">
      <div className='content-itens'>
        <TableProducts />
        <Buttons releaseOrder={releaseOrder} />
      </div>
    </article>
  )
}

export default ArtItens;