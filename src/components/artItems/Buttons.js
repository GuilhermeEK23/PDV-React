import { useEffect, useState } from 'react';
import GetOrder from '../../services/GetOrder.js';
import './Buttons.css';
import PutOrders from '../../services/PutOrders.js';

function Buttons({listProductsSelected, setIsOpenSearchOrder, orderSelected}) {
  const [order, setOrder] = useState();

  useEffect(() => {
    setOrder(orderSelected);
  }, [orderSelected])

  const releaseOrder = async () => {
    if (order === undefined){
      return
    }
    const numberOrder = await GetOrder(order);
    await PutOrders(listProductsSelected, numberOrder[0].Code);
    window.location.reload();
  }

  return (
    <div className="buttons">
      <div>Comandas</div>
      <div><span>{order}</span></div>
      <div onClick={() => {window.location.reload()}}>Limpar</div>
      <div onClick={() => setIsOpenSearchOrder(true)}>Buscar comanda</div>
      <div onClick={() => releaseOrder()}>Salvar</div>
    </div>
  )
}

export default Buttons;