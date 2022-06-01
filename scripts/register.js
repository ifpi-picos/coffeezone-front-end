function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  return false;
}

function ValidatePhone(tel) {
  if (/^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/.test(tel) || tel === '') return true;
  return false;
}

let emailValided = false;
let phoneValided = false;

function requisition (obj){
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

function putBorder (condition, element) {
  condition ? element.style.border = '2px solid var(--ColorText)' : element.style.border = '2px solid red';
}

const url = 'https://coffeezone-backend.herokuapp.com/user/';
const inputCardId = document.querySelector('input[type="number"][placeholder="ID do cartão"]');
const inputName = document.querySelector('input[type="text"][placeholder="Nome"]');
const inputEmail = document.querySelector('input[type="email"]');
const inputPassword = document.querySelector('input[type="password"][placeholder="Senha"]');
const inputPassword2 = document.querySelector('input[type="password"][placeholder="Confirmar senha"]');
const inputPhone = document.querySelector('input[type="tel"]');
const inputOccupation = document.querySelector('input[type="text"][placeholder="Função"]');
const inputsRadio = document.querySelectorAll('input[type="radio"]');

inputName.addEventListener('input', ({target}) => {
  putBorder(target.value.length > 1, target);
})

inputEmail.addEventListener('input', ({target}) => {
  let email = target.value;  
  emailValided = ValidateEmail(email)
  putBorder(ValidateEmail(email), target);
})

inputPassword.addEventListener('input', ({target}) => {
  putBorder(target.value.length > 7, target);
  inputPassword2.value ? putBorder(inputPassword2 === inputPassword.value, inputPassword2) : null;
})

inputPassword2.addEventListener('input', ({target}) => {
  putBorder(target.value === inputPassword.value, target);
})

inputPhone.addEventListener('input', ({target}) => {
  let phone = target.value;  
  phoneValided = ValidatePhone(phone)
  putBorder(ValidatePhone(phone), target);
  if(!phone) inputPhone.style.border = 'none';
})

inputOccupation.addEventListener('input', ({target}) => {
  putBorder(target.value.length > 2, target);
})

inputsRadio.forEach((element)=>{
  element.addEventListener('focus', ({target})=>{
    if(target.getAttribute('id') === 'coordinator' || target.getAttribute('id') === 'member'){
      inputCardId.style.display = "block";
    } else if(target.getAttribute('id') === 'visitor'){
      inputCardId.style.display = "none";
    }
  })
})

function submit () {

  let problem = false;
  if(inputName.value < 2){
    console.log('preencha o nome corretamente')
    problem = true;
  } else if(!ValidateEmail(inputEmail.value)){
    console.log('preencha o email corretamente')
    problem = true;
  } else if(inputPassword.value < 8){
    console.log('preencha a senha corretamente')
    problem = true;
  } else if(!inputPassword2.value === inputPassword.value){
    console.log('preencha a confirmação de senha corretamente')
    problem = true;
  } else if(!ValidatePhone(inputPhone.value)){
    console.log('preencha o telefone corretamente')
    problem = true;
  } else if(inputOccupation.value < 3){
    console.log('preencha a ocupação corretamente')
  }
  
  let inputRadio;
  if(document.querySelector('.signinInputRadio:checked')){
    inputRadio = document.querySelector('.signinInputRadio:checked').getAttribute('id');
  } else if(!document.querySelector('.signinInputRadio:checked')){
    console.log('escolha o tipo de usuário')
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
          phone: inputPhone.value,
          occupation: inputOccupation.value,
          type: inputRadio
        }
    
        for(property in object){
          if(object[property] === ''){
            delete object[property]
          }
        } 

        console.log(object);
        requisition(object);
        break

      default:
        if(!inputCardId.value) {
          console.log('preencha o campo de id do cartão')
          break
        }

        object = {
          name: inputName.value, 
          email: inputEmail.value,
          password: inputPassword.value,
          phone: inputPhone.value,
          occupation: inputOccupation.value,
          type: inputRadio,
          cardid: inputCardId.value
        }
    
        for(property in object){
          if(object[property] === ''){
            delete object[property]
          }
        }

        document.querySelector('.login-box h1').style.display = "none";
        document.querySelector('.login-box form').style.display = "none";
        document.querySelector('#loading').classList.add('loading')

        requisition(object);

        document.querySelector('#loading').classList.remove('loading')
        document.querySelector('.login-box h1').style.display = "block";
        document.querySelector('.login-box form').style.display = "flex";
    }

  } else {
    console.log("ERRO")
  }
}

const button = document.querySelector('button');
button.addEventListener('click', (e) => {
  submit();
})