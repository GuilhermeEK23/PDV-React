async function PutOrders(products, order){
  console.log("Produtos ");
  console.log(products);
  console.log("Numero da comanda " + order);

  const dataOrderProducts = {productsOrder: products, numberOrder: order};
  console.log(dataOrderProducts);

  try {
    const response = await fetch('http://localhost:3001/orderproducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataOrderProducts),
    });

    if (response.ok){
      const result = await response.json();
      console.log('Resposta da API: ', result);
    } else {
      console.error('Erro ao enviar os dados para a API', response.status);
    }
  } catch (error) {
    console.error('Erro de rede ou outro erro ', error);
  }
}

export default PutOrders;