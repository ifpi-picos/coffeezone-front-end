function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  return false;
}

function ValidatePhone(tel) {
  if (/^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/.test(tel)) return true;
  return false;
}

const url = 'https://coffeezone-backend.herokuapp.com/user/';

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

let emailValided = false;
let phoneValided = false;

const inputEmail = document.querySelector('input[type="email"]');
const inputPhone = document.querySelector('input[type="tel"]');

inputEmail.addEventListener('change', ({target}) => {
  let email = target.value;  
  emailValided = ValidateEmail(email)
  ValidateEmail(email) ? inputEmail.style.border = '2px solid var(--ColorText)' : inputEmail.style.border = '2px solid red';
  if(!email) inputEmail.style.border = 'none';
})

inputPhone.addEventListener('change', ({target}) => {
  let phone = target.value;  
  phoneValided = ValidatePhone(phone)
  ValidatePhone(phone) ? inputPhone.style.border = '2px solid var(--ColorText)' : inputPhone.style.border = '2px solid red';
  if(!phone) inputPhone.style.border = 'none';
})

function submit () {
  
  const inputPassword = document.querySelector('input[type="password"]');
  const inputName = document.querySelector('input[type="text"][placeholder="Nome"]');
  
  let inputRadio;
  if(document.querySelector('.signinInputRadio:checked')){
    inputRadio = document.querySelector('.signinInputRadio:checked');
  }
  
  let sendPhone;
  phoneValided || inputPhone.value === '' ? sendPhone = true : sendPhone = false;

  if(sendPhone && emailValided && inputName.value && inputRadio && inputPassword.value.length > 7){

    const inputNameValue = inputName.value;
    const inputEmailValue = inputEmail.value;
    const inputPasswordValue = inputPassword.value;
    const inputPhoneValue = inputPhone.value;
    const inputOccupationValue = document.querySelector('input[type="text"][placeholder="Função"]').value;
    const radioOccupationValue = inputRadio.getAttribute('id');

    const obj = {
      name: inputNameValue, 
      email: inputEmailValue,
      password: inputPasswordValue,
      phone: inputPhoneValue,
      occupation: inputOccupationValue,
      type: radioOccupationValue
    }
      
    console.log(obj)
    requisition(obj);
  } else {
    console.log("ERRO")
    console.log('sendPhone', sendPhone)
    console.log('emailValided', emailValided)
    console.log('inputRadio', inputRadio)
    console.log('inputPassword.value.lenght > 7', inputPassword.value.lenght > 7)
    console.log('preencha os campos corretamente');
  }      
}

const button = document.querySelector('button');
button.addEventListener('click', (e) => {
  submit();
})