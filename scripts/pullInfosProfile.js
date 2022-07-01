/* script para puxar as informações do usuario e coloca-las no menu da página */


/* utilizará a resposta do fetch e adicionará p(s) no menu com as informações de usuario */
function useInfos (infosJson){
  const divDataPerson = document.querySelector('.dataPerson')
  divDataPerson.insertAdjacentHTML('beforeend', `<p>Nome: ${infosJson.name}</p>`)
  divDataPerson.insertAdjacentHTML('beforeend', `<p>Email: ${infosJson.email}</p>`)
  divDataPerson.insertAdjacentHTML('beforeend', `<p class="typeUser">Tipo: ${infosJson.type}</p>`)
  divDataPerson.insertAdjacentHTML('beforeend', `<p>Função: ${infosJson.occupation}</p>`)

  /* campos que podem não existir, só serão adicionados se existirem */
  if(infosJson.linkedin) divDataPerson.insertAdjacentHTML('beforeend', `<a href="${infosJson.linkedin}">Linkedin</a>`)
  if(infosJson.cardid) divDataPerson.insertAdjacentHTML('beforeend', `<p>Id do cartão: ${infosJson.cardid}</p>`)

  /* se for um usuario coordenador, o ícone que leva a página de autorizações será mostrado */
  if(infosJson.type === "Coordinator"){
    document.querySelector('.iconRequest').style.display = "block"
  }
}

/* variável requestOptions já foi declarada em um script que foi importado anteriormente no mesmo arquivo html */
fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
  .then(response => response.json())
  .then(json => {
    useInfos(json)
  })