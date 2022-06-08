const week = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function showDay() {
    now = new Date();
    dayWeek = week[now.getDay()];
    document.getElementById('txtDayWeek').innerHTML = dayWeek;
    setTimeout('showDay()', 1000);
}
function showDayNumber() {
    now = new Date();
    day = now.getDate();
    document.getElementById('txtDayNumber').innerHTML = day;
    //document.getElementById('txtDayWeekSecond').innerHTML = day;
    //document.getElementById('txtDayWeekThird').innerHTML = day + 15;
    setTimeout('showDayNumber()', 500);
}

//Menu 
const mobileMenu = document.querySelector('.mobileMenu')
const navList = document.querySelector('.navList')
mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('navListHidden');
    mobileMenu.classList.toggle('active');
})

//Alert de reservas 

document.querySelector(".third").addEventListener('click', function () {
    Swal.fire(" ", "Reservado com sucesso!");
});

