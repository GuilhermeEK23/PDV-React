async function GetProducts(){
  return fetch('http://localhost:3001/products')
  .then(response => {
    if (!response.ok){
      throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json();
  })
  .catch(error => {
    console.log('Erro: ' + error);
  })
}

export default GetProducts;