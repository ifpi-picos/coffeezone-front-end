function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  return false;
}

let emailValided = false;

async function requisition (obj){

  document.querySelector('.login-box h1').style.display = "none";
  document.querySelector('.login-box form').style.display = "none";
  document.querySelector('#loading').classList.add('loading');

  try{
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    const resText = await response.text()
    console.log(resText)
  } catch(error){
    console.log('erro no try catch do fetch', error)
  }
  
  document.querySelector('#loading').classList.remove('loading')
  document.querySelector('.login-box h1').style.display = "block";
  document.querySelector('.login-box form').style.display = "flex";

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
const inputOccupation = document.querySelector('input[type="text"][placeholder="Função"]');
const inputsRadio = document.querySelectorAll('input[type="radio"]');

inputName.addEventListener('input', ({target}) => {
  putBorder(target.value.length > 1, target);
  if(target.value.length == 0) target.style.border = "none";
})

inputEmail.addEventListener('input', ({target}) => {
  let email = target.value;  
  emailValided = ValidateEmail(email)
  putBorder(ValidateEmail(email), target);
  if(target.value.length == 0) target.style.border = "none";
})

inputPassword.addEventListener('input', ({target}) => {
  putBorder(target.value.length > 7, target);
  inputPassword2.value ? putBorder(inputPassword2 === inputPassword.value, inputPassword2) : null;
  if(target.value.length == 0) target.style.border = "none";
})

inputPassword2.addEventListener('input', ({target}) => {
  putBorder(target.value === inputPassword.value, target);
  if(target.value.length == 0) target.style.border = "none";
})

inputOccupation.addEventListener('input', ({target}) => {
  putBorder(target.value.length > 2, target);
  if(target.value.length == 0) target.style.border = "none";
})

/**/
key = ''

window.addEventListener('keydown', function(event) {
  key = event.key;
});

window.addEventListener('click', (event) => {
  key = ''
})
/**/

inputsRadio.forEach((element)=>{
  element.addEventListener('click', ({target})=>{
    if(key !== 'Tab' && target.getAttribute('id') === 'coordinator' || target.getAttribute('id') === 'member'){
      inputCardId.style.display = "block";
    } else if(target.getAttribute('id') === 'visitor'){
      inputCardId.style.display = "none";
      if(document.querySelector('.divIdCard p')){
        inputCardId.parentNode.removeChild(document.querySelector('.divIdCard p'))
      }
    }
  })
})

inputCardId.addEventListener('input', ({target}) => {
  putBorder(target.value.length == 10, target);
  if(target.value.length == 0) target.style.border = "none";
})

function submit () {

  const mensagesErro = document.querySelectorAll('.mensageError')
  mensagesErro.forEach((p)=>{
    p.parentNode.removeChild(p);
  })

  let problem = false;
  if(inputName.value < 2){
    console.log('preencha o nome corretamente')
    inputName.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha o nome corretamente</p>');
    problem = true;
  } 
  if(!ValidateEmail(inputEmail.value)){
    console.log('preencha o email corretamente')
    inputEmail.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha o email corretamente</p>');
    problem = true;
  }
  if(inputPassword.value < 8){
    console.log('preencha a senha corretamente')
    inputPassword.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha a senha corretamente</p>');
    problem = true;
  }
  if(inputPassword2.value === inputPassword.value){
    console.log('preencha a confirmação de senha corretamente')
    inputPassword2.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha a confirmação de senha corretamente</p>');
    problem = true;
  }
  if(inputOccupation.value < 3){
    console.log('preencha a ocupação corretamente')
    inputOccupation.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha a sua função corretamente</p>');
    problem = true;
  }
  
  let inputRadio;
  if(document.querySelector('.signinInputRadio:checked')){
    inputRadio = document.querySelector('.signinInputRadio:checked').getAttribute('id');
  } else if(!document.querySelector('.signinInputRadio:checked')){
    console.log('escolha o tipo de usuário')
    document.querySelector('.lastInputRadio').insertAdjacentHTML('afterend', '<p class="mensageError">Escolha uma opção</p>');
    problem = true;
  }

  if(window.getComputedStyle(inputCardId).getPropertyValue('display') != "none" && inputCardId.value.length != 10){
    console.log('preencha o id do cartão corretamente')
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
          occupation: inputOccupation.value,
          type: inputRadio,
          cardid: inputCardId.value
        }
    
        for(property in object){
          if(object[property] === ''){
            delete object[property]
          }
        }

        requisition(object);
    }

  } else {
    console.log("ERRO")
  }
}

const button = document.querySelector('button');
button.addEventListener('click', (e) => {
  submit();
})