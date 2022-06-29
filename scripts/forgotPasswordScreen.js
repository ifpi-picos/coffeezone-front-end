function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    emailValided = true
    return true;
  } 
  return false;
}

function validateNewEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    newEmailValided = true
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

function requisitionSendNewPassword (code, object) {
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
}

function verifyLoadWithParams () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code')
  if(code) {
    document.querySelector('.forgotPasswordOtherOption').style.display = "none";
    document.querySelector('form').style.display = "none";
    
    const inputNewPassword = document.querySelector('.inputNewPassword')
    const sendNewPassword = document.querySelector('.sendNewPassword')

    inputNewPassword.style.display = 'block'
    sendNewPassword.style.display = 'block'

    inputNewPassword.addEventListener('input', ({target}) => {
      let email = target.value;  
      putBorder(validateNewEmail(email), target);
      if(target.value.length == 0) target.style.border = "none";
    })

    sendNewPassword.addEventListener('click', (e)=>{
      e.preventDefault();
      if(newEmailValided){
        let object = {
          token: code,
          password: inputNewPassword.value
        }
        requisitionSendNewPassword(JSON.stringify(object))
      }
    })
  }
}

const body = document.querySelector('body')
const buttonSendEmail = document.querySelector('.sendEmail')
const inputEmail = document.querySelector('.email')
let emailValided = false
let newEmailValided = false


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