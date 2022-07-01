/* script para o funcionamento do menu mobile */

const menu = document.querySelector('.menuHamburguer')
const leftSide = document.querySelector('.leftSide')
const imgProfile = document.querySelector('.imgProfile')
const nav = document.querySelector('nav')
const imageMenu = document.querySelector('.menuHamburguer img')

menu.addEventListener('click', ()=>{
  if(imageMenu.getAttribute('src') == 'img/menuHamburguer.png'){
    imageMenu.setAttribute('src', 'img/closeMenu.png')
  } else{
    imageMenu.setAttribute('src', 'img/menuHamburguer.png')
  }
  /* .toogle() verifica se há aquela classe, se sim ela é retirada, senão ela é adicionada */
  leftSide.classList.toggle('leftSideMenuOpen')
  imgProfile.classList.toggle('imgProfileMenuOpen')
  nav.classList.toggle('navMenuOpen')
})