import './ModalSearchOrder.css';

function SearchOrder({ }) {
  return (
    <div className="modal-search-order">
      <div className="content-modal-search-order">
        <div className="order-selection">
          <button className='close-modal-order' onClick={() => { }}>X</button>
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