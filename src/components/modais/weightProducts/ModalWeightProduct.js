import { useState, useContext, useEffect, useRef } from "react";
import "./ModalWeightProduct.css";
import { ModaisContext } from "../../../contexts/ModaisContext";

function ModalWeightProduct({ onConfirm }) {
  const { state, closeModalWeightProduct } = useContext(ModaisContext);
  const inputRef = useRef();
  const [weight, setWeight] = useState("");

  const fetchWeight = async () => {
    try {
      // Conectar ao servidor WebSocket
      const socket = new WebSocket("ws://localhost:4000");

      const pedirPeso = () => {
        socket.send("solicitarPeso");
      };

      // Quando a conexão for estabelecida
      socket.onopen = () => {
        console.log("Conexão WebSocket estabelecida");
        pedirPeso();
      };

      // Quando receber uma mensagem do servidor
      socket.onmessage = (event) => {
        const peso = parseFloat(event.data.replace(",", "."));
        setWeight(peso);
        console.log(peso);
        confirmWeight();
      };

      // Tratar erros do WebSocket
      socket.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
      };

      // Quando a conexão for fechada
      socket.onclose = () => {
        console.log("Conexão WebSocket fechada");
      };
    } catch (error) {
      console.error("Erro ao obter o peso:", error);
    }
  };

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
      fetchWeight();
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
