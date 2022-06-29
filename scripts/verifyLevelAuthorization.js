fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
  .then(response => response.json())
  .then(json => {
    if(json.type !== 'Coordinator') window.location.pathname = 'dashboard';
  })