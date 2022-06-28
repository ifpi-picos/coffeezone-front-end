function verifyToken (){
  if(!localStorage.getItem('token')){
    window.location.pathname = '';
  } 
}

verifyToken()

const token = localStorage.getItem('token')

const requestOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
      'Content-Type': 'application/json',
    Authorization: token
    }
};

fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
  .then(response => {
    if(response.status !== 200){
      window.location.pathname = '';
    }
  })