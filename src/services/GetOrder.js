async function GetOrder(numberOrder){
  return fetch(`http://localhost:3001/order/${numberOrder}`)
  .then( response => {
    if (!response.ok){
      throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json();
  })
  .catch( error => {
    console.log('Erro: ' + error);
    return [];
  })
}

export default GetOrder;