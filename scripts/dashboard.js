//Time 
const week = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
function realTime() {
  today = new Date();
  hour = today.getHours();
  minute = today.getMinutes();
  document.getElementById('txtHours').innerHTML = hour + ":" + minute;
  setTimeout('realTime()', 500);
}
function realDate() {
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  now = new Date();
  dayWeek = week[now.getDay()];
  day = now.getDate();
  month = months[now.getMonth()];
  year = now.getFullYear();

  document.getElementById('txtDate').innerHTML = dayWeek + ", " + day + " de " + month + " de " + year;
  setTimeout('realDate()', 500);
}
function showDay() {
  now = new Date();
  dayWeek = week[now.getDay()];
  document.getElementById('txtDayWeek').innerHTML = dayWeek;
  setTimeout('showDay()', 1000);
}
function showDayNumber(){
  now = new Date();
  day = now.getDate();
  document.getElementById('txtDayNumber').innerHTML = day;
  //document.getElementById('txtDayWeekSecond').innerHTML = day;
  //document.getElementById('txtDayWeekThird').innerHTML = day + 15;
  setTimeout('showDayNumber()', 500);
}
/*
function dayTomorrow(){
  today = new Date()
  tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
}
console.log(dayTomorrow())
*/
//Menu mobile

const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
  const active = nav.classList.contains('active');
  event.currentTarget.setAttribute('aria-expanded', active);
  if (active) {
    event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
  } else {
    event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
  }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  let data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Vagas ocupadas', 20],
    ['Vagas Disnponíveis', 80]
    
  ]);

  let options = {
    colors: ['#514869', '#00FF88'],
    fill: '#1e0e2cd8'

  };

  let chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}
//chart.draw(data, google.charts.Bar.convertOptions(options));    
chart.draw(data, options);    