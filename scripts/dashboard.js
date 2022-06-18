/* //Time 
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

//Menu 
const mobileMenu = document.querySelector('.mobileMenu')
const navList = document.querySelector('.navList')
mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('navListHidden');
    mobileMenu.classList.toggle('active');
})

//Graphic
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
chart.draw(data, options);     */


const occupation = document.querySelector('.occupation');
let data = new Date;
occupation.insertAdjacentHTML('beforeend', `<p id="currentTime">${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}</p>`);
const currentTime = document.querySelector('#currentTime')
setInterval(()=>{
  data = new Date;
  currentTime.innerText = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}`
}, 1000)

const iconProfile = document.querySelector('.iconProfile');
const previewProfile = document.querySelector('.previewProfile');   
iconProfile.addEventListener('mouseover', ()=>{
  previewProfile.style.display = "block"
})
iconProfile.addEventListener('mouseout', ()=>{
  previewProfile.style.display = "none"
})
iconProfile.addEventListener('click', ()=>{
  const modalProfile = document.querySelector('.modalProfile')
  modalProfile.classList.toggle('hidden')
})