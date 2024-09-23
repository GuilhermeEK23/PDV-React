import { useContext, useEffect, useRef } from 'react';
import './ModalSearchOrder.css';
import { ModaisContext } from '../../../contexts/ModaisContext';

function SearchOrder() {
  const inputRef = useRef(null);
  const {state, closeModalSearchOrder} = useContext(ModaisContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  })
  
  return ( state.modalSearchOrder &&
    <div className="modal-search-order">
      <div className="content-modal-search-order">
        <div className="order-selection">
          <button className='close-modal-order' onClick={() => {closeModalSearchOrder()}}>X</button>
          <div>
            <input
              type="number"
              placeholder="Número da comanda"
              ref={inputRef}
            />
            <button className='confirm-order-selected' onClick={() => { }}>OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchOrder;