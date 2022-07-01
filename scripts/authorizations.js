/* script para inserir as requisições realizadas para o coordenador na tela de autorizações */

function insertRequests (arrayRequests) {
  /* percorre o array de resposta do fetch */
  arrayRequests.forEach((req)=>{
    /* para cada item do array, é criada uma div com suas informações e inserida no final da div requests */
    requestsDiv.insertAdjacentHTML('beforeend', `
    <div class="request">
      <div class="requestTop">
        <h2>Tipo de solicitação: ${req.type === "User" ? 'Cadastro' : null}</h2>
      </div>
      <div class="requestBottom">
        <div class="dataRequest">
          <p>Nome: ${req.data.name}</p>
          <p>Email: ${req.data.email}</p>
          <p>Tipo: ${req.data.type}</p>
          <p>Data e hora: ${req.laststatustime}</p>
          ${req.data.cardid ? '<p>Id do cartão: 1234567891</p>' : ''}
        </div>
        <div class="buttons">
          <button class="denied">Negar</button>
          <button class="accept">Aceitar</button>
        </div>
      </div>
    </div>
    `)
  })
}

const requestsDiv = document.querySelector('.requests')
const requestOptionsGetAuthorizations = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
      'Content-Type': 'application/json',
    Authorization: token
    }
};

fetch("https://coffeezone-backend.herokuapp.com/authorization/", requestOptionsGetAuthorizations)
  .then(response => {
    return response.json()
  })
  .then(json => {
    insertRequests(json)
  })

