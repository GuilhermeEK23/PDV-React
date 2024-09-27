import { useContext } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import './TableProducts.css';
import logo_white from '../../assets/logo-white.png';
import { CartContext } from '../../contexts/CartContext';

function TableProducts() {
  const {cartProducts, setCartProducts} = useContext(CartContext);

  const deleteProduct = (index) => {
    const newCartProducts = cartProducts.filter((item) => item.Index !== index);
    setCartProducts(newCartProducts);
  }

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((item, key) => (
              <tr key={key}>
                <td>{item.Description}</td>
                <td>{item.SalePrice.toFixed(2)}</td>
                <td>{item.Quantity.toFixed(3)}</td>
                <td>{(item.SalePrice * item.Quantity).toFixed(2)}</td>
                <td><FaTrashAlt onClick={() => deleteProduct(item.Index)} className='icon-trash' /></td>
              </tr>
            ))}
            <tr>
              <td colSpan={5}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="logo">
        <img src={logo_white} alt="logo white" height={25} />
      </div>
    </div>
  )
}

export default TableProducts;