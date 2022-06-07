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

//Menu 
const mobileMenu = document.querySelector('.mobileMenu')
const navList = document.querySelector('.navList')
mobileMenu.addEventListener('click', ()=>{
  navList.classList.toggle('navListHidden');
  mobileMenu.classList.toggle('active');
})
/*
function dayTomorrow(){
  today = new Date()
  tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
}
console.log(dayTomorrow())
*/

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  let data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Ocupado', 20],
    ['Disponível', 80]
    
  ]);

  let options = {
    colors: ['#514869', '#00FF88'],
    backgroundColor: '#40324c',
    pieSliceText: 'label', 
    legend: 'none',
    strokeWidth: 0,
    pieSliceTextStyle: {
      color: '#2f2841',
      bold: true,
      fontSize: 20,
    },
  };

  let chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}
//chart.draw(data, google.charts.Bar.convertOptions(options));    
chart.draw(data, options);    