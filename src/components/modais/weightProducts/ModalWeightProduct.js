import { useState, useContext, useEffect, useRef } from "react";
import "./ModalWeightProduct.css";
import { ModaisContext } from "../../../contexts/ModaisContext";

function ModalWeightProduct({ onConfirm }) {
  const { state, closeModalWeightProduct } = useContext(ModaisContext);
  const inputRef = useRef();
  const [weight, setWeight] = useState("");

  const confirmWeight = () => {
    if (weight) {
      onConfirm(weight);
      closeModalWeightProduct();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      confirmWeight();
    }
  };

  useEffect(() => {
    if (state.modalWeightProduct && inputRef.current) {
      inputRef.current.focus();
    }
    setWeight("");
  }, [state.modalWeightProduct]);

  return (
    state.modalWeightProduct && (
      <div onKeyDown={handleKeyDown} className="modal-weight-product">
        <div className="content-modal-weight-product">
          <div className="weight-selection">
            <button
              className="close-modal-weight"
              onClick={() => {
                closeModalWeightProduct();
              }}
            >
              X
            </button>
            <div>
              <input
                type="number"
                placeholder="Peso do produto"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
                ref={inputRef}
              />
              <button
                className="confirm-weight-selected"
                onClick={confirmWeight}
              >
                OK
              </button>
              :
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalWeightProduct;
