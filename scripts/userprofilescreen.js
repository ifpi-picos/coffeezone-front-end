
const infoname = document.querySelector('.infoname')
const infofuction = document.querySelector('.infofuction')
const infomember = document.querySelector('.infomember')
const infoemail = document.querySelector('.infoemail')
const infophone = document.querySelector('.infophone')
const infolinkedin = document.querySelector('.infolinkedin')
const infogithub = document.querySelector('.infogithub')

const token = localStorage.getItem('token')


let infos;

function useInfos(a){
  infoname.innerText = a.name
  infoemail.innerText = a.email
  infofuction.innerText = a.occupation
  infomember.innerText = a.type
  infophone.innerText = a.phone
  infolinkedin.innerText = a.linkedin
  infolinkedin.innerText = a.github
}

var requestOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
      'Content-Type': 'application/json',
    Authorization: token
    }
};

fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
  .then(response => response.text())
  .then(result => {
    infos = JSON.parse(result)
    useInfos(infos)
    if(infos.profileimage){
      document.querySelector('img').setAttribute('src', infos.profileimage)
    }
  })
  .catch(error => console.log('error', error));

const Delete = document.querySelector('.delete')
  
Delete.addEventListener('click',function(){
  const infosUser = document.querySelector('.infoRight')
  infosUser.style.display = 'none'
  const screenDelete = document.querySelector('.afterDelete')
  screenDelete.style.display = 'block'
})

const nDelete = document.querySelector('.n')

nDelete.addEventListener('click', function(){
  const nUser = document.querySelector('.infoRight')
  nUser.style.display = '-webkit-box'
  const nScreenDelete = document.querySelector('.afterDelete')
  nScreenDelete.style.display = 'none'
})

const yDelete = document.querySelector('.y')

yDelete.addEventListener('click', function(){
  var requestOptions = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  }

  let deleteInfo;

  fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
    .then(response => response.text())
    .then(result => {
      deleteInfo = JSON.parse(result)
      localStorage.removeItem('token')
      window.location.pathname = "/coffeezone-front-end/"
    })
    .catch(error => console.log('error', error));
})

const mobileMenu = document.querySelector('.mobileMenu')
const navList = document.querySelector('.navList')
mobileMenu.addEventListener('click', ()=>{
  navList.classList.toggle('navListHidden');
  mobileMenu.classList.toggle('active');
})

const imgProfile = document.querySelector('img')
const profileInputText = document.querySelector('input')
const buttonProfile = document.querySelector('button')
buttonProfile.addEventListener('click', function() {

  let askOptions = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      modify: {
        profileimage: profileInputText.value
      }
    })
  };

  fetch("https://coffeezone-backend.herokuapp.com/user/", askOptions)
    .then(response => response.text())
    .then(result => {
      console.log(JSON.parse(result))
      profileInputText.value = ''
      fetch("https://coffeezone-backend.herokuapp.com/user/", requestOptions)
        .then(res => res.json())
        .then((resJson) => {
          document.querySelector('img').setAttribute('src', resJson.profileimage)
        })
    })
    .catch(error => console.log('error', error));
  })  