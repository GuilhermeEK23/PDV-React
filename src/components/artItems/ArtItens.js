import './ArtItens.css';
import TableProducts from './TableProducts.js';
import Buttons from './Buttons.js';

function ArtItens({}) {
  return (
    <article className="itens">
      <div className='content-itens'>
        <TableProducts />
        <Buttons />
      </div>
    </article>
  )
}

export default ArtItens;