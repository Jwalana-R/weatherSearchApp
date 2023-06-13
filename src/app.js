let now = new Date();
let Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = Days[now.getDay()];

let datetime = document.querySelector("#date-time");
datetime.innerHTML = `${day} ${now.getHours()}:${now.getMinutes()} `;

let form = document.querySelector("form");
form.addEventListener("submit", search);

let cityname = document.querySelector("#cityname");
let cityinput = document.querySelector("#city-input");
function search(event) {
  event.preventDefault();
  if (cityinput.value) {
    cityname.innerHTML = `${cityinput.value}`;
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityinput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(follow);
}

let apiKey = "aa09763d916df0424c840d55bfc2d2c9";

let weatherdes = document.querySelector("#description");
let temp = document.querySelector("#temperature");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");
let imgele = document.querySelector("#icon");
let cellink = document.querySelector("#cel-link");
let farlink = document.querySelector("#far-link");

function follow(response) {
  console.log(response);
  weatherdes.innerHTML = `${response.data.weather[0].description}`;
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  cityname.innerHTML = `${response.data.name}`;
  imgele.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  imgele.setAttribute("alt", response.data.weather[0].description);
  celtemp = response.data.main.temp;
}

farlink.addEventListener("click", showfartemp);
let celtemp = null;

function showfartemp(event) {
  event.preventDefault();
  farlink.classList.add("active");
  cellink.classList.remove("active");
  let fartemp = (celtemp * 9) / 5 + 32;
  temp.innerHTML = `${Math.round(fartemp)}`;
}

cellink.addEventListener("click", showceltemp);

function showceltemp(event) {
  event.preventDefault();
  cellink.classList.add("active");
  farlink.classList.remove("active");
  temp.innerHTML = `${Math.round(celtemp)}`;
}
