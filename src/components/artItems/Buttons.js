import { useEffect, useState } from 'react';
import './Buttons.css';

function Buttons({ setIsOpenSearchOrder, orderSelected, releaseOrder }) {
  const [order, setOrder] = useState();

  useEffect(() => {
    setOrder(orderSelected);
  }, [orderSelected])

  return (
    <div className="buttons">
      <div>Comandas</div>
      <div><span>{order}</span></div>
      <div onClick={() => { window.location.reload() }}>Limpar</div>
      <div onClick={() => setIsOpenSearchOrder(true)}>Buscar comanda</div>
      <div onClick={() => releaseOrder()}>Salvar</div>
    </div>
  )
}

export default Buttons;