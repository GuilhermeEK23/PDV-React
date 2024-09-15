import './Product.css';

function Product({code, description, stock, price, productSelected, chooseSelectedProduct, setProductSelected}){
  return (
    <div 
      className={`product ${productSelected === code ? 'product-selected' : ''}`}
      onClick={() => {
        chooseSelectedProduct(code);
        setProductSelected(code);
      }}
    >
      <div className="image-product">
        <img src="http://localhost:8081/content/img/no_image.png" alt="productImage" />
      </div>
      <div className="info-product">
        <div className="name-product">
          {code} - {description}
        </div>
        <div className='values-product'>
          <span className="price-product">R$ {price}</span>
          <span className="stock-product">{stock}</span>
        </div>
      </div>
    </div>
  )
}

export default Product;