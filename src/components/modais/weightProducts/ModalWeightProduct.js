import { useContext } from 'react';
import './ModalWeightProduct.css';
import { ModaisContext } from '../../../contexts/ModaisContext';

function ModalWeightProduct() {
  const {state, closeModalWeightProduct} = useContext(ModaisContext);

  return ( state.modalWeightProduct &&
    <div className="modal-weight-product">
      <div className="content-modal-weight-product">
        <div className="weight-selection">
          <button className='close-modal-weight' onClick={() => {closeModalWeightProduct()}}>X</button>
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