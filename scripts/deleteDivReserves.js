function deleteContentDiv(div){
  div.innerText = ''
}

fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
  .then(response => response.json())
  .then(json => {
    if(json.type === "Coordinator"){
      const divReservations = document.querySelector('.reservations')
      divReservations.parentElement.removeChild(divReservations)
      const bottom = document.querySelector('.bottom')
      bottom.style.flexDirection = "column"
    }
  })

