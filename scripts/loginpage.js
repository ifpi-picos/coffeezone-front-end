function entrar() {
  const mensagesError = document.querySelectorAll('.mensageError');
  mensagesError.forEach((p)=>{
    p.parentNode.removeChild(p);
  })

  const usuario = document.getElementById("usuario")
  const senha = document.getElementById("Senha")
  let problem = false;

  if(!ValidateEmail(usuario.value)){
    usuario.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha o email corretamente</p>');
    problem = true;
  }

  if(senha.value.length < 8){
    senha.insertAdjacentHTML('afterend', '<p class="mensageError">Preencha a senha corretamente</p>');
    problem = true;
  }

  if(!problem){
    let data = {
    email: usuario.value,
    password: senha.value,
    };
    fetch("https://coffeezone-backend.herokuapp.com/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        response.json().then((json) => {
          if (json.token) {
            localStorage.setItem("token", json.token);
            window.location.href = "dashboard"
          }
        });
      })
      .catch((err) => console.log(err));
  }
}

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  return false;
}

const constValidateEmail = document.querySelector(
  'input[type="text"][placeholder="E-mail"]'
);

constValidateEmail.addEventListener("input", ({ target }) => { 
  putBorder(ValidateEmail(target.value), target);
});

function putBorder(condition, element) {
  condition
    ? (element.style.border = "2px solid var(--ver)")
    : (element.style.border = "2px solid red");
}
const inputOccupation = document.querySelector(
  'input[type="password"][placeholder="Senha"]'
);

inputOccupation.addEventListener("input", ({ target }) => {
  putBorder(target.value.length > 7, target);
});

const passwordinput = document.getElementById("Senha");
const eyeSvg = document.getElementById("eyeSvg");

function eyeClick() {
  let inpuTypeIspassword = passwordinput.type == "password";
  

  if (inpuTypeIspassword) {
    showPassword();
  } else {
    hidePassword();
  }
}
function showPassword() {
  passwordinput.setAttribute("type", "text")
  eyeSvg.setAttribute("src", "img/open.png")
}
function hidePassword() {
  passwordinput.setAttribute("type", "password");
  eyeSvg.setAttribute("src", "img/close.png")
}
