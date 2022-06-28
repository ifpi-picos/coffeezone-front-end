function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    emailValided = true
    return true;
  } 
  return false;
}

function putBorder (condition, element) {
  condition ? element.style.border = '2px solid var(--button)' : element.style.border = '2px solid var(--buttonhovernot)';
}

function alterContent (content) {
  document.querySelector('.forgotPasswordOtherOption').style.display = "none";
  document.querySelector('form').style.display = "none";
  document.querySelector('.sectionForm').insertAdjacentHTML('beforeend', `<h1>${content}</h1>`)
}

function requisitionSendEmail (object) {
  const url = 'https://coffeezone-backend.herokuapp.com/auth/recovery/';
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: object
  }).then((res)=>{
    console.log(res)  
    return res.json()
  }).then(json=>{
    if(json.success === "Email enviado com sucesso"){
      alterContent('Verifique seu email')
    } else {
      alterContent(json.error)
    }
  })
}

/* function requisitionSendNewPassword (object) {
  const url = 'https://coffeezone-backend.herokuapp.com/auth/recovery/';
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: object
  }).then((res)=>{
    console.log(res)  
    return res.json()
  }).then(json=>{
    buttonSendEmail.insertAdjacentHTML('afterend', `<p>Nome: ${json.sucess}</p>`)
  })
} */

function verifyLoadWithParams () {
  if(gi) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_type = urlParams.get('page_type')
    console.log(page_type);
  }
}

const body = document.querySelector('body')
const buttonSendEmail = document.querySelector('.sendEmail')
const inputEmail = document.querySelector('.email')
let emailValided = false

inputEmail.addEventListener('input', ({target}) => {
  let email = target.value;  
  putBorder(validateEmail(email), target);
  if(target.value.length == 0) target.style.border = "none";
})

buttonSendEmail.addEventListener('click', (e)=>{
  e.preventDefault();
  if(emailValided){
    let object = {
      email: inputEmail.value
    }
    requisitionSendEmail(JSON.stringify(object))
  }
})

body.addEventListener('load', verifyLoadWithParams())