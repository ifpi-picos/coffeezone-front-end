function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  return false;
}

function treatingRes (status, resJson) {
  switch(status){
    case 201:
      document.querySelector('.registerBox h1').style.display = "none";
      document.querySelector('.registerBox form').style.display = "none";
      document.querySelector('.registerBox').insertAdjacentHTML('afterbegin', '<h2 class="mensageSucess">Cadastro realizado com sucesso</h2>');
      setTimeout(()=>{
        window.location.pathname = '/login';
      }, 3000)
      break;
    case 400:
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
    case 500:
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

async function requisition (obj){
  document.querySelector('.registerBox h1').style.display = "none";
  document.querySelector('.registerBox form').style.display = "none";
  document.querySelector('#loading').classList.add('loading');

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  let resJson = await response.json();
  
  document.querySelector('#loading').classList.remove('loading');
  document.querySelector('.registerBox h1').style.display = "block";
  document.querySelector('.registerBox form').style.display = "flex";

  treatingRes(response.status, resJson);
}

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

let key = '';

window.addEventListener('keydown', function(event) {
  key = event.key;
});

window.addEventListener('click', (event) => {
  key = '';
})

inputsRadio.forEach((element)=>{
  element.addEventListener('click', ({target})=>{
    if(key !== 'Tab' && target.getAttribute('id') === 'Coordinator' || target.getAttribute('id') === 'Member'){
      inputCardId.style.display = "block";
    } else if(target.getAttribute('id') === 'Visitor'){
      inputCardId.style.display = "none";
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

function submit () {
  const mensagesError = document.querySelectorAll('.mensageError');
  mensagesError.forEach((p)=>{
    p.parentNode.removeChild(p);
  })

  let problem = false;
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
  
  let inputRadio;
  if(document.querySelector('.signinInputRadio:checked')){
    inputRadio = document.querySelector('.signinInputRadio:checked').getAttribute('id');
  } else if(!document.querySelector('.signinInputRadio:checked')){
    document.querySelector('.lastInputRadio').insertAdjacentHTML('afterend', '<p class="mensageError">Escolha uma opção</p>');
    problem = true;
  }

  if(window.getComputedStyle(inputCardId).getPropertyValue('display') != "none" && inputCardId.value.length != 10){
    inputCardId.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha o id do cartão corretamente</p>');
    problem = true;
  }

  if(!problem){
    let object;
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

    for(property in object){
      if(object[property] === ''){
        delete object[property];
      }
    } 

    requisition(object);
  }
}

const button = document.querySelector('button');
button.addEventListener('click', (e) => {
  submit();
})