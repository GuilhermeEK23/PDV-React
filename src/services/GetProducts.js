import configConnectionServer from '../configConnectionServer.json';

async function GetProducts(){
  return fetch(`http://${configConnectionServer.hostname}:${configConnectionServer.port}/products`)
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