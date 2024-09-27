import { useContext } from "react";
import "./Buttons.css";
import { OrderContext } from "../../contexts/OrderContext.js";
import { ModaisContext } from "../../contexts/ModaisContext.js";

function Buttons({ releaseOrder }) {
  const { openModalSearchOrder } = useContext(ModaisContext);
  const { numberOrder } = useContext(OrderContext);

  return (
    <div className="orderButtons">
      <div className="orderInfo">
        <p>F4 - Para gravar na comanda</p>
        <div className="numberOrder">
          <p>COMANDA</p>
          <span>{numberOrder}</span>
        </div>
      </div>
      <div className="buttons">
        <button onClick={() => {window.location.reload();}}>
          LIMPAR
        </button>
        <button onClick={() => {}}>BUSCAR</button>
        <button onClick={openModalSearchOrder}>GRAVAR</button>
      </div>
    </div>
  );
}

export default Buttons;
