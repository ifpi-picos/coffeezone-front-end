/*var myHeaders = new Headers();
myHeaders.append("Authorization", "TokenProvidedOnLogin");*/

const infoname = document.querySelector('.infoname')
const infofuction = document.querySelector('.infofuction')
const infomember = document.querySelector('.infomember')
const infoemail = document.querySelector('.infoemail')
const infophone = document.querySelector('.infophone')
const infolinkedin = document.querySelector('.infolinkedin')

const token = localStorage.getItem('token')

/*var raw = "{\r\n    \"name\": \"User Complete Name\",\r\n    \"email\": \"user@email.com\",\r\n    \"phone\": \"+5589999999999\",\r\n    \"password\": \"userpassword\",\r\n    \"occupation\": \"User occupation\",\r\n    \"type\": \"Member\",\r\n    \"linkedin\": \"https://www.linkedin.com/in/userlinkedin/\" //Optional\r\n}";*/

var requestOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
      'Content-Type': 'application/json',
    Authorization: token
    }
};

let infos;

function useInfos(a){
  infoname.innerText = a.name
  infoemail.innerText = a.email
  infofuction.innerText = a.occupation
  infomember.innerText = a.type
  infophone.innerText = a.phone
  infolinkedin.innerText = a.linkedin
}

fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
  .then(response => response.text())
  .then(result => {
    infos = JSON.parse(result)
    useInfos(infos)
  })
  .catch(error => console.log('error', error));
