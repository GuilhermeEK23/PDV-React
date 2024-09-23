import { useContext } from 'react';
import './TableProducts.css';
import { CartContext } from '../../contexts/CartContext';

function TableProducts() {
  const {cartProducts} = useContext(CartContext);
  console.log(cartProducts);

  return (
    <div className="grid-products">
      <div className='div-table-products'>
        <table className='table-products'>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Qtd</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((item, key) => (
              <tr key={key}>
                <td>{item.Description}</td>
                <td>{item.SalePrice.toFixed(2)}</td>
                <td>{item.Quantity.toFixed(3)}</td>
                <td>{(item.SalePrice * item.Quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="summary">
        <div>Itens <span>0(0)</span></div>
        <div>Desconto <span>0,00</span></div>
        <div>Valor pago <span>0,00</span></div>
        <div>Troco <span>0,00</span></div>
        <div className="total">
          <span>Total:</span>
          <span><img src="http://localhost:8081/content/img/logo-white.png" alt="logo white" height={25} /></span>
          <span>0,00</span>
        </div>
      </div>
    </div>
  )
}

export default TableProducts;