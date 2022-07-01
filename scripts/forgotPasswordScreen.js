/* recebe um email de parametro e valida se está de acordo com o regex, se estiver retorna true, senão retorna false */
function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    emailValided = true
    return true;
  } 
  return false;
}

/* valida se a senha tem mais que 7 caracteres, retorna um booleano de acordo com a verificação e altera o valor da variável newPasswordValided  */
function validateNewPassword(password) {
  if (password.length >= 8){
    newPasswordValided = true
    return true;
  } 
  return false;
}

/* função para colocar borda no elemento
  recebe uma condição e um elemento, de acordo com o resultado da condição, e colocada uma borda diferente */
function putBorder (condition, element) {
  condition ? element.style.border = '2px solid var(--button)' : element.style.border = '2px solid var(--buttonhovernot)';
}

/* função para alterar o conteudo da sectionForm */
function alterContent (content) {
  document.querySelector('.forgotPasswordOtherOption').style.display = "none";
  document.querySelector('form').style.display = "none";
  document.querySelector('.sectionForm').insertAdjacentHTML('beforeend', `<h1>${content}</h1>`)
}

/* função para enviar email para recuperação de senha, e exibição da resposta */
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
    return res.json()
  }).then(json=>{
    if(json.success === "Email enviado com sucesso"){
      alterContent('Verifique seu email')
    } else {
      alterContent(json.error)
    }
  })
}

/* função para enviar nova senha, exibição da resposta e redirecionamento para login após determinado tempo */
function requisitionSendNewPassword (object) {
  const url = 'https://coffeezone-backend.herokuapp.com/auth/recovery/';
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: object
  }).then((res)=>{ 
    return res.json()
  }).then(json=>{
    buttonSendEmail.insertAdjacentHTML('afterend', `<p>Nome: ${json.sucess}</p>`)
    setTimeout(()=>{
      window.location.pathname = '/login';
    }, 3000)
  })
}

/* função para verificar se há algum parametro na url */
function verifyLoadWithParams () {
  /* retorna a parte da url referente a pesquisa */
  const queryString = window.location.search;
  /* nova instância da classe URLSearchParams */
  const urlParams = new URLSearchParams(queryString);
  /* valor referente a chave code da pesquisa no url */
  const code = urlParams.get('code')
  if(code) {
    /* se existir um valor em 'code' alterará o css da página */
    document.querySelector('.forgotPasswordOtherOption').style.display = "none";
    document.querySelector('form').style.display = "none";
    
    const inputNewPassword = document.querySelector('.inputNewPassword')
    const sendNewPassword = document.querySelector('.sendNewPassword')

    inputNewPassword.style.display = 'block'
    sendNewPassword.style.display = 'block'

    /* será adicionado no input da nova senha um evento para validar o valor do input e colocar uma borda baseado no resultado da validação */
    inputNewPassword.addEventListener('input', ({target}) => {
      let password = target.value;  
      putBorder(validateNewPassword(password), target);
      /* se o input estiver vazio, não há borda */
      if(target.value.length == 0) target.style.border = "none";
    })

    /* evento no botão de enviar senha */
    sendNewPassword.addEventListener('click', (e)=>{
      /* previnir o padrão de recarregar página ao enviar formulário */
      e.preventDefault();
      /* verifica se a senha é válida, se sim é criado um objeto com a senha e o codigo na url que é enviado na função como string JSON */
      if(newPasswordValided){
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
let newPasswordValided = false

/* será adicionado no input de email um evento para validar o valor do input e colocar uma borda baseado no resultado da validação */
inputEmail.addEventListener('input', ({target}) => {
  let email = target.value;  
  putBorder(validateEmail(email), target);
  if(target.value.length == 0) target.style.border = "none";
})

/* evento no botão de enviar senha */
buttonSendEmail.addEventListener('click', (e)=>{
  /* previnir o padrão de recarregar página ao enviar formulário */
  e.preventDefault();
  /* verifica se o email é válido, se sim é criado um objeto com o email e é enviado na função como string JSON */
  if(emailValided){
    let object = {
      email: inputEmail.value
    }
    requisitionSendEmail(JSON.stringify(object))
  }
})

/* toda vez que o body carrega essa função é chamada */
body.addEventListener('load', verifyLoadWithParams()) 