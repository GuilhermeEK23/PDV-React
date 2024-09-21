import './ModalWeightProduct.css';

function ModalWeightProduct({}) {

  return (
    <div className="modal-weight-product">
      <div className="content-modal-weight-product">
        <div className="weight-selection">
          <button className='close-modal-weight' onClick={() => {}}>X</button>
          <div>
            <input
              type="number"
              placeholder="Peso do produto"
            />
            <button className='confirm-weight-selected' onClick={() => {}}>OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalWeightProduct;