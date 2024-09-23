import { useContext, useEffect, useRef } from "react";
import "./ModalSearchOrder.css";
import { ModaisContext } from "../../../contexts/ModaisContext";
import { OrderContext } from "../../../contexts/OrderContext";

function SearchOrder() {
  const inputRef = useRef(null);
  const { state, closeModalSearchOrder } = useContext(ModaisContext);
  const { setNumberOrder } = useContext(OrderContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      Number.isInteger(parseInt(inputRef.current.value)) &&
      inputRef.current.value > 0
    ) {
      setNumberOrder(inputRef.current.value);
      closeModalSearchOrder();
      return;
    } else if (event.key === "Enter") {
      alert("preencha o numero da comanda corretamente");
    }
  };

  return (
    state.modalSearchOrder && (
      <div onKeyDown={handleKeyDown} className="modal-search-order">
        <div className="content-modal-search-order">
          <div className="order-selection">
            <button
              className="close-modal-order"
              onClick={closeModalSearchOrder}
            >
              X
            </button>
            <div>
              <input
                type="number"
                placeholder="Número da comanda"
                ref={inputRef}
              />
              <button
                className="confirm-order-selected"
                onClick={() => setNumberOrder(inputRef.current.value)}
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

export default SearchOrder;
