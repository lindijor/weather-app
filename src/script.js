function updateWeatherData(response) {
  let cityTemperature = document.querySelector("#weather-degrees");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#weather-city");
  let weatherDescription = document.querySelector("#weather-description");
  let weatherHumidity = document.querySelector("#weather-humidity");
  let weatherWind = document.querySelector("#weather-wind");
  let currentTime = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);

  console.log(response.data);

  city.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  weatherHumidity.innerHTML = response.data.temperature.humidity;
  weatherWind.innerHTML = response.data.wind.speed;
  currentTime.innerHTML = getTheDate(date);
  cityTemperature.innerHTML = Math.round(temperature);
}

function getTheDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "025000aa1bof6148etc27f34c35bd48a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#city-search");
searchFormElement.addEventListener("submit", displayCity);

searchCity("Oslo");
