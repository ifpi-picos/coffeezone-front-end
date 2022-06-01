  function entrar() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('Senha').value;
    let data = {
      email: usuario, 
      password: senha,
      
    }
    fetch('https://coffeezone-backend.herokuapp.com/auth/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => {
      response.json().then((json) => {
        if (json.token) {
          localStorage.setItem('token', json.token)
          window.location.href = window.location.href + "/index.html"


        }
      })
    }) 
    .catch(err => console.log(err))
  }