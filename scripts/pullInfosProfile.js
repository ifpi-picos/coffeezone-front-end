function useInfos (infosJson){
  const divDataPerson = document.querySelector('.dataPerson')
  divDataPerson.insertAdjacentHTML('beforeend', `<p>Nome: ${infosJson.name}</p>`)
  divDataPerson.insertAdjacentHTML('beforeend', `<p>Email: ${infosJson.email}</p>`)
  divDataPerson.insertAdjacentHTML('beforeend', `<p class="typeUser">Tipo: ${infosJson.type}</p>`)
  divDataPerson.insertAdjacentHTML('beforeend', `<p>Função: ${infosJson.occupation}</p>`)

  if(infosJson.linkedin) divDataPerson.insertAdjacentHTML('beforeend', `<a href="${infosJson.linkedin}">Linkedin</a>`)
  if(infosJson.cardid) divDataPerson.insertAdjacentHTML('beforeend', `<p>Id do cartão: ${infosJson.cardid}</p>`)

  if(infosJson.type === "Coordinator"){
    document.querySelector('.iconRequest').style.display = "block"
  }
}

fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
  .then(response => response.json())
  .then(json => {
    useInfos(json)
  })