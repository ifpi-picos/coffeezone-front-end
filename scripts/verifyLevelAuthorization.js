/*
script para verificar se o usuario é um coordenador
  se não for, redireciona-lo para dashboard

script importado na página de autorizações

variável requestOptions já foi declarada em um script que foi importado anteriormente no mesmo arquivo html
*/

fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
  .then(response => response.json())
  .then(json => {
    if(json.type !== 'Coordinator') window.location.pathname = 'dashboard';
  })