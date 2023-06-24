let now = new Date();
let date = document.querySelector("#date");
let minutes = now.getMinutes();
let hours = now.getHours();
let datee = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let span = document.querySelector("#date");
span.innerHTML = ` ${day}, ${month}, ${year}, ${hours}:${minutes}`;
function formatDay(timestamp){
  let date2 =new Date(timestamp*1000);
  let day2= date2.getDay();
  let days2 = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days2[day2];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast=response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
 

  
 
  forecast.forEach(function (forecastDay, index) {
    if (index <6){
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src=${forecastDay.condition.icon_url}
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}° </span>
          <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}° </span>
        </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "65d753t6f570a99a70b4eab3cdo14900";
  let apiUrl= `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  celsiusTemp = response.data.temperature.current;
  let temperatureElement = document.querySelector("#temperature");

  let cityElement = document.querySelector("#city");

  let descriptioElement = document.querySelector("#description");

  let humidityElement = document.querySelector("#humidity");

  let windElement = document.querySelector("#wind");

  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.city;
  descriptioElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  iconElement.setAttribute(
    "src",
    `${response.data.condition.icon_url}`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}
function search(city) {
  let apiKey = "65d753t6f570a99a70b4eab3cdo14900";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function submit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#cityInput");
  search(cityElement.value);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function displayCelsiustemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);

let fahrenheitLink = document.querySelector("#fahrenheitValue");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsiusValue");
celsiusLink.addEventListener("click", displayCelsiustemp);
search("Rome");
