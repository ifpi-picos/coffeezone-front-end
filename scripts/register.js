/* trocar 'function' */

function ValidateName(name) {
  if (/^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/.test(name)) return true;
  return false;
}

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  return false;
}

function ValidatePhone(tel) {
  if (/^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/.test(tel)) /* +55 (89) 99415-3367 ou +55 (89) 9415-3367 */ return true;
  return false;
}

/* function validation (targetValue, input, infoValided, infoValidation) {
  info = infoValided;
  info = infoValidation(targetValue);
  infoValidation(targetValue) ? input.style.border = '2px solid var(--ColorText)' : input.style.border = '2px solid red';
  if(!targetValue) input.style.border = 'none'; 
  console.log(info);
} */

let nameValided = false;
let emailValided = false;
let phoneValided = false;

const inputName = document.querySelector('input[type="text"][placeholder="Nome"]');
inputName.addEventListener('keyup', ({target}) => {
  let name = target.value;  
  nameValided = ValidateName(name)
  ValidateName(name) ? inputName.style.border = '2px solid var(--ColorText)' : inputName.style.border = '2px solid red';
  if(!name) inputName.style.border = 'none'; 
})

const inputEmail = document.querySelector('input[type="email"]');
inputEmail.addEventListener('keyup', ({target}) => {
  let email = target.value;  
  emailValided = ValidateEmail(email)
  ValidateEmail(email) ? inputEmail.style.border = '2px solid var(--ColorText)' : inputEmail.style.border = '2px solid red';
  if(!email) inputEmail.style.border = 'none';
})

const inputPhone = document.querySelector('input[type="tel"]');
inputPhone.addEventListener('keyup', ({target}) => {
  let phone = target.value;  
  phoneValided = ValidatePhone(phone)
  ValidatePhone(phone) ? inputPhone.style.border = '2px solid var(--ColorText)' : inputPhone.style.border = '2px solid red';
  if(!phone) inputPhone.style.border = 'none';
})

function submit () {
  if(nameValided && emailValided && phoneValided && document.querySelector('.signinInputRadio:checked') && document.querySelector('input[type="password"]').value){

    const inputName = document.querySelector('input[type="text"][placeholder="Nome"]').value;
    const inputEmail = document.querySelector('input[type="email"]').value;
    const inputPassword = document.querySelector('input[type="password"]').value;
    const inputPhone = document.querySelector('input[type="tel"]').value;
    const inputFunction = document.querySelector('input[type="text"][placeholder="Função"]').value;
    const radioFunction = document.querySelector('.signinInputRadio:checked').getAttribute('id');

    const obj = {
      name: inputName,
      email: inputEmail,
      password: inputPassword,
      phone: inputPhone,
      funcText: inputFunction,
      funcRadio: radioFunction
    }
    console.log(obj)
  } else {
    console.log('preencha todos os campos corretamente')
  }
}

const button = document.querySelector('button');
button.addEventListener('click', (e) => {
  submit();
}) 