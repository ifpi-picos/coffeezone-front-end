/* script para inserir e alterar a data na dashboard */

const occupation = document.querySelector('.occupation');
/* cria uma instância da classe Date */
let data = new Date;
/* insere um elemento p com a data e hora atual na div occupation */
occupation.insertAdjacentHTML('beforeend', `<p id="currentTime">${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}</p>`);
const currentTime = document.querySelector('#currentTime')
/* a cada segundo, o valor do p criado é atualizado para o momento atual */
setInterval(()=>{
  data = new Date;
  currentTime.innerText = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}`
}, 1000)