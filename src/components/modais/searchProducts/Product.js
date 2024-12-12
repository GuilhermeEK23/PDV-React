import "./Product.css";

function Product({ code, description, price, stock, productSelected, selectProduct, addProductToCart }) {

  return (
    <div
      onClick={() => {
        selectProduct(code);
        addProductToCart(code);
      }}
      className={`product ${
        productSelected === code ? "product-selected" : ""
      }`}
    >
      <div className="name-product">
        {code} - {description}
      </div>
      <div className="price-product">
        R$ {price.toFixed(2)}
      </div>
    </div>
  );
}

export default Product;
