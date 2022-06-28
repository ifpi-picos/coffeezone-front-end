<<<<<<< HEAD

=======
>>>>>>> cc430d7e6bbe571b27641b9f19453654c44ec3e7
const occupation = document.querySelector('.occupation');
let data = new Date;
occupation.insertAdjacentHTML('beforeend', `<p id="currentTime">${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}</p>`);
const currentTime = document.querySelector('#currentTime')
setInterval(()=>{
  data = new Date;
  currentTime.innerText = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}`
<<<<<<< HEAD
}, 1000)
=======
}, 1000)
>>>>>>> cc430d7e6bbe571b27641b9f19453654c44ec3e7
