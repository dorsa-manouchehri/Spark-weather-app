function displayTemperature(response){
    console.log(response.data.main.temp)
    let temperatureElement= document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.name;
    let descriptioElement=document.querySelector("#description");
    descriptioElement.innerHTML=response.data.weather[0].description;
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;
    let windElement= document.querySelector("#wind");
    windElement.innerHTML=response.data.wind.speed;
}

let apiKey="5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Qom&appid=${apiKey}&units=metric`  ;  

axios.get(apiUrl).then(displayTemperature);
