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
function displayTemperature(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");

  let cityElement = document.querySelector("#city");

  let descriptioElement = document.querySelector("#description");

  let humidityElement = document.querySelector("#humidity");

  let windElement = document.querySelector("#wind");

  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descriptioElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
