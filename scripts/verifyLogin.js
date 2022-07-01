/*
script para verificar se a pessoa está logada no sistema
*/

/* verifica se há um token no localStorage, se não houver é redirecionado para o index */
function verifyToken (){
  if(!localStorage.getItem('token')){
    window.location.pathname = '';
  } 
}

verifyToken()

const token = localStorage.getItem('token')

/* armazena informações do fetch que será feito */
const requestOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
      'Content-Type': 'application/json',
    Authorization: token
    }
};

/* um fetch é feito utilizando o valor que estiver na chave 'token' do localStorage, se a resposta da requisição for diferente de 200, a pessoa é redirecionada para o index */
fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
  .then(response => {
    if(response.status !== 200){
      window.location.pathname = '';
    }
  })