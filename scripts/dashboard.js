const occupation = document.querySelector('.occupation');
let data = new Date;
occupation.insertAdjacentHTML('beforeend', `<p id="currentTime">${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}</p>`);
const currentTime = document.querySelector('#currentTime')
setInterval(()=>{
  data = new Date;
  currentTime.innerText = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}`
}, 1000)