import { useContext } from 'react';
import './ModalSearchOrder.css';
import { ModaisContext } from '../../../contexts/ModaisContext';

function SearchOrder() {
  const {state, closeModalSearchOrder} = useContext(ModaisContext);
  
  return ( state.modalSearchOrder &&
    <div className="modal-search-order">
      <div className="content-modal-search-order">
        <div className="order-selection">
          <button className='close-modal-order' onClick={() => {closeModalSearchOrder()}}>X</button>
          <div>
            <input
              type="number"
              placeholder="Número da comanda"
            />
            <button className='confirm-order-selected' onClick={() => { }}>OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchOrder;