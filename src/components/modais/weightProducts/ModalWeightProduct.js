import { useState, useContext, useEffect, useRef } from "react";
import "./ModalWeightProduct.css";
import { ModaisContext } from "../../../contexts/ModaisContext";

function ModalWeightProduct({ onConfirm }) {
  const { state, closeModalWeightProduct } = useContext(ModaisContext);
  const inputRef = useRef();
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const intervalRef = useRef(null);

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
        setIsFetching(true);
        setError("");

        intervalRef.current = setInterval(() => {
          pedirPeso();
        }, 2000);
      };

      // Quando receber uma mensagem do servidor
      socket.onmessage = (event) => {
        const peso = parseFloat(event.data.replace(",", "."));
        setWeight(peso);

        // Parar as tentativas quando o peso for recebido
        clearInterval(intervalRef.current);
        setIsFetching(false);

        // Adicionar um atraso de 500ms antes de confirmar o peso
        setTimeout(() => {
          onConfirm(peso);
        }, "600");
      };

      // Tratar erros do WebSocket
      socket.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
        setError("Erro na conexão com a balança.")
        setIsFetching(false);
      };

      // Quando a conexão for fechada
      socket.onclose = () => {
        console.log("Conexão WebSocket fechada");
        clearInterval(intervalRef.current); // Parar o loop ao fechar a conexão
        setIsFetching(false);
      };
    } catch (error) {
      console.error("Erro ao obter o peso:", error);
      setError("Erro ao tentar conectar com a balança.");
      setIsFetching(false);
    }
  };

  const confirmWeight = () => {
    if (weight) {
      onConfirm(weight);
      closeModalWeightProduct();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !Number.isNaN(weight) && weight > 0) {
      confirmWeight();
    }
  };

  useEffect(() => {
    if (state.modalWeightProduct && inputRef.current) {
      inputRef.current.focus();
      fetchWeight();
    }
    setWeight("");
    return () => {
      // Limpar o intervalo ao desmontar o componente
      clearInterval(intervalRef.current);
    };
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
                disabled={isFetching} // Desabilitar o botão enqueanto busca o peso
              >
                OK
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {isFetching && (
              <p className="loading-message">Tentando obter o peso da balança...</p>
            )} {/* Mostrar status de busca */}
          </div>
        </div>
      </div>
    )
  );
}

export default ModalWeightProduct;
