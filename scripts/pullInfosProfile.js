function useInfos (infosJson){
  const divDataPerson = document.querySelector('.dataPerson')
  divDataPerson.insertAdjacentHTML('beforeend', `<p>Nome: ${infosJson.name}</p>`)
  divDataPerson.insertAdjacentHTML('beforeend', `<p>Email: ${infosJson.email}</p>`)
  divDataPerson.insertAdjacentHTML('beforeend', `<p>Tipo: ${infosJson.type}</p>`)
  divDataPerson.insertAdjacentHTML('beforeend', `<p>Função: ${infosJson.occupation}</p>`)

  if(infosJson.linkedin) divDataPerson.insertAdjacentHTML('beforeend', `<a href="${infosJson.linkedin}">Linkedin</a>`)
  if(infosJson.cardid) divDataPerson.insertAdjacentHTML('beforeend', `<p>Id do cartão: ${infosJson.cardid}</p>`)
}

/* const token = localStorage.getItem('token') */

/* const requestOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
      'Content-Type': 'application/json',
    Authorization: token
    }
}; */

fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
  .then(response => response.json())
  .then(json => {
    useInfos(json)
  })

  /* 
  
  cardid: null
  email: "email1@email.com"
  id: 2
  linkedin: null
  name: "Italo Paixão Gomes"
  occupation: "front end"
  preferences: {sendActionRegEmail: true}
  profileimage: null
  type: "Coordinator"
  
  */