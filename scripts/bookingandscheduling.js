//Menu 
const mobileMenu = document.querySelector('.mobileMenu')
const navList = document.querySelector('.navList')
mobileMenu.addEventListener('click', ()=>{
  navList.classList.toggle('navListHidden');
  mobileMenu.classList.toggle('active');
})