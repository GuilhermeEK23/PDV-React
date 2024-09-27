import configConnectionServer from '../configConnectionServer.json';

async function GetOrder(numberOrder){
  return fetch(`http://${configConnectionServer.hostname}:${configConnectionServer.port}/order/${numberOrder}`)
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