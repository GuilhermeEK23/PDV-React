import { useRef, useEffect, useState } from 'react';
import './ModalWeightProduct.css';

function ModalWeightProduct({ modalWeightProductIsOpen, setModalWeightProductIsOpen, handleWeightConfirm }) {
  const [WeightProduct, setWeightProduct] = useState();
  const inputRef = useRef(null);

  const fetchWeight = async () => {
    try {
      // Conectar ao servidor WebSocket
    const socket = new WebSocket('ws://localhost:4000');
    
    const pedirPeso = () => {
      socket.send('solicitarPeso');
    }

    // Quando a conexão for estabelecida
    socket.onopen = () => {
      console.log('Conexão WebSocket estabelecida');
      pedirPeso();
    };

    // Quando receber uma mensagem do servidor
    socket.onmessage = (event) => {
      const peso = parseFloat((event.data).replace(',', '.'));
      setWeightProduct(peso);
      console.log(peso);
      handleWeightConfirm(peso);
    };

    // Tratar erros do WebSocket
    socket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    // Quando a conexão for fechada
    socket.onclose = () => {
      console.log('Conexão WebSocket fechada');
    };
    } catch (error) {
      console.error("Erro ao obter o peso:", error);
    }
  }

  useEffect(() => {
    setWeightProduct(null);
    if (modalWeightProductIsOpen) {
      inputRef.current.focus(); // Foca no input quando o modal abre
      console.log("chamando o fetch");
      fetchWeight();
    }
  }, [modalWeightProductIsOpen])

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value); // Converte para número
    if (!isNaN(value)) {
      setWeightProduct(value); // Atualiza o peso somente se o valor for válido
      return;
    }
    setWeightProduct();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && WeightProduct){
      handleWeightConfirm(WeightProduct);
    }
  }

  if (!modalWeightProductIsOpen) return null; // Retorna null se o modal não estiver aberto

  return (
    <div className="modal-weight-product">
      <div className="content-modal-weight-product">
        <div className="weight-selection" onKeyDown={handleKeyDown}>
          <button className='close-modal-weight' onClick={() => setModalWeightProductIsOpen(false)}>X</button>
          <div>
            <input
              ref={inputRef}
              type="number"
              placeholder="Peso do produto"
              value={WeightProduct}
              onChange={handleInputChange}
            />
            <button className='confirm-weight-selected' onClick={() => handleWeightConfirm(WeightProduct)}>OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalWeightProduct;