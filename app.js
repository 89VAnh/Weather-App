var search = document.querySelector(".search");
var city = document.querySelector(".city");
var country = document.querySelector(".country");
var clocks = document.querySelector(".clocks");
var dateHTML = document.querySelector(".date");
var temperature = document.querySelector(".temperature span");
var shortDesc = document.querySelector(".short-desc");
var visibility = document.querySelector(".visibility span");
var wind = document.querySelector(".wind span");
var cloud = document.querySelector(".cloud span");
var container = document.querySelector(".container");
var body = document.querySelector("body");

if (!localStorage.input) {
  localStorage.input = "Hanoi";
}
chageWeatherUI(localStorage.input);

async function chageWeatherUI(input) {
  let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=6db1795c7e6122643f99088c85f89b3c`;

  let data = await fetch(weatherAPI).then((res) => res.json());

  if (data.cod === 200) {
    city.innerText = data.name;
    country.innerText = data.sys.country;
    temperature.innerText = Math.round(data.main.temp - 273);
    setBackground(temperature.innerText);
    shortDesc.innerText = data.weather[0].main;
    visibility.innerText = data.visibility + " (m)";
    wind.innerText = data.wind.speed + " (m/s)";
    cloud.innerText = data.clouds.all + " (%)";
  }
}

search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const input = e.target.value;
    localStorage.input = input;
    chageWeatherUI(localStorage.input);
    e.target.value = "";
  }
});

function setBackground(temp) {
  if (temp > 20) {
    var backgroundImg = "./hot.png";
  } else {
    var backgroundImg = "./cold.png";
  }
  const setBackgroundImg = `url(${backgroundImg}) no-repeat center/ cover`;
  body.style.background =
    "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8))," +
    setBackgroundImg;
  container.style.background = setBackgroundImg;
}
setInterval(() => {
  var date = new Date();
  dateHTML.innerText =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  function checkTime(time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  }
  var hours = checkTime(date.getHours());
  var minutes = checkTime(date.getMinutes());
  var seconds = checkTime(date.getSeconds());

  clocks.innerText = hours + ":" + minutes + ":" + seconds;
}, 1000);
