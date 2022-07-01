/* recebe um email de parametro e valida se está de acordo com o regex, se estiver retorna true, senão retorna false */
function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  return false;
}

/* função para tratar resposta vinda do back end */
function treatingRes (status, resJson) {
  /* verifica o status da resposta */
  switch(status){
    /* se for 200 (sucesso), retira o titulo e o formulário da tela e mostra um aviso de sucesso */
    case 201:
      document.querySelector('.registerBox h1').style.display = "none";
      document.querySelector('.registerBox form').style.display = "none";
      document.querySelector('.registerBox').insertAdjacentHTML('afterbegin', '<h2 class="mensageSucess">Cadastro realizado com sucesso</h2>');
      /* redireciona para a tela de login após 3s */
      setTimeout(()=>{
        window.location.pathname = '/login';
      }, 3000)
      break;
    /* se for 400 (erro do usuário) */
    case 400:
      /* verifica a resposta de erro e mostra ao usuário */
      switch (resJson.error){
        case 'Cartão já cadastrado':
          inputCardId.insertAdjacentHTML('afterend', `<p class="mensageError">${resJson.error}</p>`);
          break;
        case 'Nome inválido':
          inputName.insertAdjacentHTML('afterend', `<p class="mensageError">${resJson.error}</p>`);
          break;
        case 'Email já cadastrado':
          inputEmail.insertAdjacentHTML('afterend', `<p class="mensageError">${resJson.error}</p>`);
          break;
      }
      break;
    /* se for 500 (em teoria, algum erro no servidor) */
    case 500:
      /* retira o titulo e o formulário da tela, mostra um aviso de erro e após alguns segundos mostra novamente o formulário */
      document.querySelector('.registerBox h1').style.display = "none";
      document.querySelector('.registerBox form').style.display = "none";
      document.querySelector('.registerBox').insertAdjacentHTML('afterbegin', '<h2 class="mensageError">Ocorreu um erro inesperado, tente novamente</h2>');
      setTimeout(()=>{
        document.querySelector('h2').parentNode.removeChild(document.querySelector('h2'));
        document.querySelector('.registerBox h1').style.display = "block";
        document.querySelector('.registerBox form').style.display = "flex";
      }, 3500)
      break;
    }
}

/* função asícrona que recebe o objeto com as informações do cadastro para fazer a requisição */
async function requisition (obj){
  /* retira o titulo e o formulário da tela, e mostra um loading */
  document.querySelector('.registerBox h1').style.display = "none";
  document.querySelector('.registerBox form').style.display = "none";
  document.querySelector('#loading').classList.add('loading');

  /* realiza a requisição e guarda a resposta em uma variável */
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  /* transforma a resposta da requisição em json e a armazena */
  let resJson = await response.json();
  
  /* remove o loading, e mostra novamente o título e o formulário */
  document.querySelector('#loading').classList.remove('loading');
  document.querySelector('.registerBox h1').style.display = "block";
  document.querySelector('.registerBox form').style.display = "flex";

  /* chama a função de tratar resposta da requisição */
  treatingRes(response.status, resJson);
}

/* função para adicionar borda no elemento enviado como parametro baseado no valor booleano enviado */
function putBorder (condition, element) {
  condition ? element.style.border = '2px solid var(--button)' : element.style.border = '2px solid var(--buttonDenied)';
}

const url = 'https://coffeezone-backend.herokuapp.com/user/';
const inputCardId = document.querySelector('input[type="number"][placeholder="ID do cartão"]');
const inputName = document.querySelector('input[type="text"][placeholder="Nome"]');
const inputEmail = document.querySelector('input[type="email"]');
const inputPassword = document.querySelector('input[type="password"][placeholder="Senha"]');
const inputConfirmPassword = document.querySelector('input[type="password"][placeholder="Confirmar senha"]');
const inputOccupation = document.querySelector('input[type="text"][placeholder="Função"]');
const inputsRadio = document.querySelectorAll('input[type="radio"]');

/* adicionam eventos nos inputs para que o seu conteúdo seja analisado e inserida uma borda conforme o resultado da validação */
inputName.addEventListener('input', ({target}) => {
  putBorder(target.value.length > 1, target);
  if(target.value.length == 0) target.style.border = "none";
})

inputEmail.addEventListener('input', ({target}) => {
  let email = target.value;  
  putBorder(ValidateEmail(email), target);
  if(target.value.length == 0) target.style.border = "none";
})

inputPassword.addEventListener('input', ({target}) => {
  putBorder(target.value.length > 7, target);
  inputConfirmPassword.value ? putBorder(inputConfirmPassword === inputPassword.value, inputConfirmPassword) : null;
  if(target.value.length == 0) target.style.border = "none";
})

inputConfirmPassword.addEventListener('input', ({target}) => {
  putBorder(target.value === inputPassword.value, target);
  if(target.value.length == 0) target.style.border = "none";
})

inputOccupation.addEventListener('input', ({target}) => {
  putBorder(target.value.length > 2, target);
  if(target.value.length == 0) target.style.border = "none";
})


/* percorre o array de inputs radio, em cada um é adicionado um evento de click, e verifica o tipo selecionado, com base nisso o campo de id do cartão é adicionado ou retirado */
inputsRadio.forEach((element)=>{
  element.addEventListener('click', ({target})=>{
    if(target.getAttribute('id') === 'Coordinator' || target.getAttribute('id') === 'Member'){
      inputCardId.style.display = "block";
    } else if(target.getAttribute('id') === 'Visitor'){
      inputCardId.style.display = "none";
      /* se houver um p (mensagem informando que o campo não foi preenchido corretamente) ele será deletado */
      if(document.querySelector('.divIdCard p')){
        inputCardId.parentNode.removeChild(document.querySelector('.divIdCard p'));
      }
    }
  })
})

inputCardId.addEventListener('input', ({target}) => {
  putBorder(target.value.length == 10, target);
  if(target.value.length == 0) target.style.border = "none";
})

/* função para verificar o preenchimento dos campos e enviar a requisição para o back end */
function submit () {
  /* caso já haja mensagens de erro no preenchimento, elas são armazenadas em um array, percorridas e retiradas */
  const mensagesError = document.querySelectorAll('.mensageError');
  mensagesError.forEach((p)=>{
    p.parentNode.removeChild(p);
  })

  /* variável criada para informar sobre a existência de algum problema no preenchimento dos campos */
  let problem = false;
  /* verificação sobre preenchimento dos campos, caso não esteja de acordo com o esperado, adiciona uma mensagem informando sobre o problema, e altera o valor da variável 'problem' */
  if(inputName.value < 2){
    inputName.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha o nome corretamente</p>');
    problem = true;
  } 
  if(!ValidateEmail(inputEmail.value)){
    inputEmail.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha o email corretamente</p>');
    problem = true;
  }
  if(inputPassword.value.length < 8){
    inputPassword.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha a senha corretamente</p>');
    problem = true;
  }
  if(inputConfirmPassword.value !== inputPassword.value){
    inputConfirmPassword.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha a confirmação de senha corretamente</p>');
    problem = true;
  }
  if(inputOccupation.value < 3){
    inputOccupation.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha a sua função corretamente</p>');
    problem = true;
  }
  
  /* verificação do preenchimento do input radio, se for preenchido será armazenado seu id (que é enviado para o back end posteriormente), se não tiver sido preenchido é adicionada uma mensagem avisando e altera o valor da variável 'problem' */
  let inputRadio;
  if(document.querySelector('.signinInputRadio:checked')){
    inputRadio = document.querySelector('.signinInputRadio:checked').getAttribute('id');
  } else if(!document.querySelector('.signinInputRadio:checked')){
    document.querySelector('.lastInputRadio').insertAdjacentHTML('afterend', '<p class="mensageError">Escolha uma opção</p>');
    problem = true;
  }

  /* trás um objeto com todo o estilo do input de id do cartão, verifica o seu display e verifica o preenchimento do campo de input, caso esteja visivel e não preenchido corretamente, adiciona uma mensagem avisando */
  if(window.getComputedStyle(inputCardId).getPropertyValue('display') != "none" && inputCardId.value.length != 10){
    inputCardId.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha o id do cartão corretamente</p>');
    problem = true;
  }

  /* if não ocorrer nenhum problema no preenchimento dos inputs, é criado um objeto com as informações do input e realizada a requisição  */
  if(!problem){
    let object;
    /* verifica se o valor do input radio, se for 'visitor' não envia o valor do input de id do cartão, se for diferente ele é adicionado no objeto */
    switch(inputRadio){
      case 'visitor':
        object = {
          name: inputName.value, 
          email: inputEmail.value,
          password: inputPassword.value,
          occupation: inputOccupation.value,
          type: inputRadio
        }
        break;
      default:
          object = {
          name: inputName.value, 
          email: inputEmail.value,
          password: inputPassword.value,
          occupation: inputOccupation.value,
          type: inputRadio,
          cardid: inputCardId.value
        }
    }

    /* verifica se alguma chave do objeto está vazia, se sim ela é retirada */
    for(property in object){
      if(object[property] === ''){
        delete object[property];
      }
    } 

    /* chama a função de requisição */
    requisition(object);
  }
}

/* adiciona evento no botão de enviar informações, quando clicado chamará a função submit */
const button = document.querySelector('button');
button.addEventListener('click', (e) => {
  submit();
})