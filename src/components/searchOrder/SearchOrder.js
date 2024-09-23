import { useEffect, useRef, useState } from 'react';
import './SearchOrder.css';

function SearchOrder({ isOpenSearchOrder, setIsOpenSearchOrder, setOrderSelected }) {
  const [numberOrder, setNumberOrder] = useState();
  const inputRef = useRef(null);

  const setNewOrderSelected = () => {
    setOrderSelected(numberOrder);
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [isOpenSearchOrder])

  const handleKeyDown = async (event) => {
    if (event.key === 'Escape') {
      setIsOpenSearchOrder(false);
    } else if (event.key === 'Enter') {
      setNewOrderSelected();
    }
  };

  if (isOpenSearchOrder) {
    return (
      <div className="modal-search-order">
        <div className="content-modal-search-order">
          <div className="order-selection">
            <button className='close-modal-order' onClick={() => setIsOpenSearchOrder(false)}>X</button>
            <div>
              <input
                ref={inputRef}
                type="number"
                placeholder="Número da comanda"
                onChange={(e) => setNumberOrder(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className='confirm-order-selected' onClick={() => setNewOrderSelected()}>OK</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <div ref={inputRef}></div>;
}

export default SearchOrder;