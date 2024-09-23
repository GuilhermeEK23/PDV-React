import { useContext } from "react";

import "./Buttons.css";
import { OrderContext } from "../../contexts/OrderContext.js";
import { ModaisContext } from "../../contexts/ModaisContext.js";

function Buttons({ releaseOrder }) {
  const { openModalSearchOrder } = useContext(ModaisContext);
  const { numberOrder } = useContext(OrderContext);

  return (
    <div className="buttons">
      <div>Comandas</div>
      <div>
        <span>{numberOrder}</span>
      </div>
      <div onClick={() => {window.location.reload();}}>
        Limpar
      </div>
      <div onClick={openModalSearchOrder}>Buscar comanda</div>
      <div onClick={releaseOrder}>Salvar</div>
    </div>
  );
}

export default Buttons;
