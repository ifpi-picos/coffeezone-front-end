const infoname = document.querySelector('h2[type="text"]')
const infofuction = document.querySelector('h2[type="text"]')
const infomember = document.querySelector('h2[type="text"]')
const infoemail = document.querySelector('h2[type="email"]')
const infophone = document.querySelector('h2[type="phone"]')
const infolinkedin = document.querySelector('h2[type="linkedin"}')

var raw = "{\r\n    \"name\": \"User Complete Name\",\r\n    \"email\": \"user@email.com\",\r\n    \"phone\": \"+5589999999999\",\r\n    \"password\": \"userpassword\",\r\n    \"occupation\": \"User occupation\",\r\n    \"type\": \"Member\",\r\n    \"linkedin\": \"https://www.linkedin.com/in/userlinkedin/\" //Optional\r\n}";

var requestOptions = {
  method: 'get',
  body: raw,
  Headers: {
    Accept: 'application/json',
      'Content-Type': 'application/json',
    Authorization:
      'U2FsdGVkX18Bp/qsNbHkhpvuUTb/+ahxa+KPSIKV4/nc9Qr92WTJFQbX5jbcCTYGv4JX0k47uqh+UF1PZp5ysGujq6Ob4g0LlZwCU3t4adYulN5e2PcmmEkL6aPrCkFi3u+ZDHiM0NKWUH2UkMhX/xlMFXfbE60HjYeKDdBOcNP4tRDFaTgo3TWKo4yI7+8LoE+9WxLXOsldKPEhMepLZyjPupOzGqWzHMH2cnwH2s/VrRSBw56UMZVpNTFNGseMva1i4ZBfZErlsFkaohy96MQqBT/NpsYXCIuKgzubrqU='
    }
};

fetch("{{/coffeezone-backend.herokuapp.com/}}/user/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(JSON.parce(result)))
  .catch(error => console.log('error', error));